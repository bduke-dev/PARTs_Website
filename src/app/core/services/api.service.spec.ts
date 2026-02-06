import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from './api.service';
import { GeneralService } from './general.service';
import { ModalService } from './modal.service';
import { APIStatus, Banner, SiteBanner } from '../models/api.models';
import { BehaviorSubject } from 'rxjs';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let siteBannersSubject: BehaviorSubject<SiteBanner[]>;

  beforeEach(() => {
    siteBannersSubject = new BehaviorSubject<SiteBanner[]>([]);

    const gsSpy = jasmine.createSpyObj('GeneralService', [
      'incrementOutstandingCalls',
      'decrementOutstandingCalls',
      'addSiteBanner',
      'removeSiteBanner'
    ]);
    gsSpy.siteBanners = siteBannersSubject.asObservable();

    const msSpy = jasmine.createSpyObj('ModalService', ['checkResponse']);
    msSpy.checkResponse.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        APIService,
        { provide: GeneralService, useValue: gsSpy },
        { provide: ModalService, useValue: msSpy }
      ]
    });

    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
    generalServiceSpy = TestBed.inject(GeneralService) as jasmine.SpyObj<GeneralService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API Status Management', () => {
    it('should initialize with API status on', (done) => {
      service.apiStatus.subscribe(status => {
        expect(status).toBe(APIStatus.on);
        done();
      });
    });

    it('should add offline banner when API status changes to off', (done) => {
      service.apiStatus.subscribe(status => {
        if (status === APIStatus.off) {
          expect(generalServiceSpy.addSiteBanner).toHaveBeenCalledWith(
            jasmine.objectContaining({ message: 'Application is running in offline mode.' })
          );
          done();
        }
      });

      // Trigger API status check failure
      service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'), { status: 504 });
    });

    it('should remove offline banner when API status changes to on', (done) => {
      // First set to off
      service.getAPIStatus();
      let req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'), { status: 504 });

      setTimeout(() => {
        // Then set to on
        service.getAPIStatus();
        req = httpMock.expectOne('public/api-status/');
        req.flush({ branch: 'main' });

        setTimeout(() => {
          expect(generalServiceSpy.removeSiteBanner).toHaveBeenCalledWith(
            jasmine.objectContaining({ message: 'Application is running in offline mode.' })
          );
          done();
        }, 10);
      }, 10);
    });

    it('should not add duplicate offline banner', (done) => {
      siteBannersSubject.next([new SiteBanner('0', 'Application is running in offline mode.')]);

      service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'), { status: 504 });

      setTimeout(() => {
        expect(generalServiceSpy.addSiteBanner).not.toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe('getAPIStatus', () => {
    it('should return branch name on successful check', async () => {
      const promise = service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.flush({ branch: 'develop' });

      const result = await promise;
      expect(result).toBe('develop');
    });

    it('should return empty string when response has no branch', async () => {
      const promise = service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.flush({ status: 'ok' });

      const result = await promise;
      expect(result).toBe('');
    });

    it('should set API status to on when check succeeds', async () => {
      service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.flush({ branch: 'main' });

      await new Promise(resolve => setTimeout(resolve, 10));

      let currentStatus: APIStatus = APIStatus.off;
      service.apiStatus.subscribe(status => currentStatus = status);
      expect(currentStatus).toBe(APIStatus.on);
    });

    it('should set API status to off when check fails', (done) => {
      service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'));

      setTimeout(() => {
        let currentStatus: APIStatus = APIStatus.on;
        service.apiStatus.subscribe(status => currentStatus = status);
        expect(currentStatus).toBe(APIStatus.off);
        done();
      }, 10);
    });

    it('should reuse outstanding API status check', () => {
      const promise1 = service.getAPIStatus();
      const promise2 = service.getAPIStatus();

      expect(promise1).toBe(promise2);

      const req = httpMock.expectOne('public/api-status/');
      req.flush({ branch: 'main' });
    });

    it('should allow new check after previous completes', async () => {
      const promise1 = service.getAPIStatus();
      const req1 = httpMock.expectOne('public/api-status/');
      req1.flush({ branch: 'main' });
      await promise1;

      const promise2 = service.getAPIStatus();
      const req2 = httpMock.expectOne('public/api-status/');
      req2.flush({ branch: 'develop' });

      expect(promise1).not.toBe(promise2);
    });
  });

  describe('GET requests', () => {
    it('should make GET request without loading screen', async () => {
      const promise = service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      req.flush({ data: 'test' });

      expect(generalServiceSpy.incrementOutstandingCalls).not.toHaveBeenCalled();
      await promise;
      expect(generalServiceSpy.decrementOutstandingCalls).not.toHaveBeenCalled();
    });

    it('should make GET request with loading screen', async () => {
      const promise = service.get(true, 'test/endpoint');

      expect(generalServiceSpy.incrementOutstandingCalls).toHaveBeenCalled();

      const req = httpMock.expectOne('test/endpoint');
      req.flush({ data: 'test' });

      await promise;
      expect(generalServiceSpy.decrementOutstandingCalls).toHaveBeenCalled();
    });

    it('should make GET request with query params', async () => {
      const params = { id: 123, filter: 'active' };
      service.get(false, 'test/endpoint', params);

      const req = httpMock.expectOne(r => r.url === 'test/endpoint' && r.params.get('id') === '123');
      expect(req.request.params.get('filter')).toBe('active');
      req.flush({});
    });

    it('should call onNext callback on success', async () => {
      const onNextSpy = jasmine.createSpy('onNext');
      const testData = { data: 'test' };

      service.get(false, 'test/endpoint', undefined, onNextSpy);
      const req = httpMock.expectOne('test/endpoint');
      req.flush(testData);

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(onNextSpy).toHaveBeenCalledWith(testData);
    });

    it('should call onError callback when modal service returns false', async () => {
      modalServiceSpy.checkResponse.and.returnValue(false);
      const onErrorSpy = jasmine.createSpy('onError');
      const testData = { error: 'test' };

      service.get(false, 'test/endpoint', undefined, undefined, onErrorSpy);
      const req = httpMock.expectOne('test/endpoint');
      req.flush(testData);

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(onErrorSpy).toHaveBeenCalledWith(testData);
    });

    it('should call onComplete callback', async () => {
      const onCompleteSpy = jasmine.createSpy('onComplete');

      service.get(true, 'test/endpoint', undefined, undefined, undefined, onCompleteSpy);
      const req = httpMock.expectOne('test/endpoint');
      req.flush({});

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(onCompleteSpy).toHaveBeenCalled();
    });

    it('should handle HTTP error', async () => {
      const onErrorSpy = jasmine.createSpy('onError');

      service.get(true, 'test/endpoint', undefined, undefined, onErrorSpy);
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 500 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(onErrorSpy).toHaveBeenCalled();
      expect(generalServiceSpy.decrementOutstandingCalls).toHaveBeenCalled();
    });

    it('should trigger API status check on connection error', async () => {
      spyOn(service, 'getAPIStatus');

      service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 0 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(service.getAPIStatus).toHaveBeenCalled();
    });

    it('should set API status to on after successful request when it was off', async () => {
      // Set API to off first
      service.getAPIStatus();
      let req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'), { status: 504 });

      await new Promise(resolve => setTimeout(resolve, 10));

      // Make successful request
      service.get(false, 'test/endpoint');
      req = httpMock.expectOne('test/endpoint');
      req.flush({ data: 'test' });

      await new Promise(resolve => setTimeout(resolve, 10));

      let currentStatus: APIStatus = APIStatus.off;
      service.apiStatus.subscribe(status => currentStatus = status);
      expect(currentStatus).toBe(APIStatus.on);
    });
  });

  describe('POST requests', () => {
    it('should make POST request without loading screen', async () => {
      const postData = { name: 'test' };
      const promise = service.post(false, 'test/endpoint', postData);
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(postData);
      req.flush({ success: true });

      expect(generalServiceSpy.incrementOutstandingCalls).not.toHaveBeenCalled();
    });

    it('should make POST request with loading screen', async () => {
      const postData = { name: 'test' };
      service.post(true, 'test/endpoint', postData);

      expect(generalServiceSpy.incrementOutstandingCalls).toHaveBeenCalled();

      const req = httpMock.expectOne('test/endpoint');
      req.flush({ success: true });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(generalServiceSpy.decrementOutstandingCalls).toHaveBeenCalled();
    });
  });

  describe('PUT requests', () => {
    it('should make PUT request', async () => {
      const putData = { id: 1, name: 'updated' };
      service.put(false, 'test/endpoint', putData);

      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(putData);
      req.flush({ success: true });
    });

    it('should make PUT request with loading screen', async () => {
      service.put(true, 'test/endpoint', {});

      expect(generalServiceSpy.incrementOutstandingCalls).toHaveBeenCalled();

      const req = httpMock.expectOne('test/endpoint');
      req.flush({});

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(generalServiceSpy.decrementOutstandingCalls).toHaveBeenCalled();
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE request without params', async () => {
      service.delete(false, 'test/endpoint');

      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true });
    });

    it('should make DELETE request with params', async () => {
      const params = { id: 456 };
      service.delete(false, 'test/endpoint', params);

      const req = httpMock.expectOne(r => r.url === 'test/endpoint' && r.params.get('id') === '456');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should make DELETE request with loading screen', async () => {
      service.delete(true, 'test/endpoint');

      expect(generalServiceSpy.incrementOutstandingCalls).toHaveBeenCalled();

      const req = httpMock.expectOne('test/endpoint');
      req.flush({});

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(generalServiceSpy.decrementOutstandingCalls).toHaveBeenCalled();
    });
  });

  describe('Connection error handling', () => {
    it('should recognize status 0 as connection error', async () => {
      spyOn(service, 'getAPIStatus');

      service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 0 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(service.getAPIStatus).toHaveBeenCalled();
    });

    it('should recognize status 504 as connection error', async () => {
      spyOn(service, 'getAPIStatus');

      service.post(false, 'test/endpoint', {});
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 504 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(service.getAPIStatus).toHaveBeenCalled();
    });

    it('should not trigger API check for non-connection errors', async () => {
      spyOn(service, 'getAPIStatus');

      service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 404 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(service.getAPIStatus).not.toHaveBeenCalled();
    });
  });

  describe('Response handling', () => {
    it('should return result from successful request', async () => {
      const testData = { id: 1, value: 'test' };
      const promise = service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      req.flush(testData);

      const result = await promise;
      expect(result).toEqual(testData);
    });

    it('should return error from failed request', async () => {
      const promise = service.get(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      const errorEvent = new ProgressEvent('error');
      req.error(errorEvent, { status: 500, statusText: 'Server Error' });

      const result = await promise;
      expect(result.status).toBe(500);
    });
  });

  describe('Edge cases and additional scenarios', () => {
    it('should handle get request with empty params object', async () => {
      service.get(false, 'test/endpoint', {});
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.params.keys().length).toBe(0);
      req.flush({});
    });

    it('should handle post request with null body', async () => {
      service.post(false, 'test/endpoint', null);
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.body).toBeNull();
      req.flush({});
    });

    it('should handle put request with empty object', async () => {
      service.put(false, 'test/endpoint', {});
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.body).toEqual({});
      req.flush({});
    });

    it('should handle delete request without params', async () => {
      service.delete(false, 'test/endpoint');
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle multiple concurrent GET requests', async () => {
      const promise1 = service.get(false, 'test/endpoint1');
      const promise2 = service.get(false, 'test/endpoint2');
      const promise3 = service.get(false, 'test/endpoint3');

      const req1 = httpMock.expectOne('test/endpoint1');
      const req2 = httpMock.expectOne('test/endpoint2');
      const req3 = httpMock.expectOne('test/endpoint3');

      req1.flush({ data: '1' });
      req2.flush({ data: '2' });
      req3.flush({ data: '3' });

      const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);
      expect(result1.data).toBe('1');
      expect(result2.data).toBe('2');
      expect(result3.data).toBe('3');
    });

    it('should handle request with array params', async () => {
      const params = { ids: [1, 2, 3] };
      service.get(false, 'test/endpoint', params);
      const req = httpMock.expectOne(r => r.url === 'test/endpoint');
      expect(req.request.params.getAll('ids')).toEqual(['1', '2', '3']);
      req.flush({});
    });

    it('should handle request with boolean params', async () => {
      const params = { active: true, deleted: false };
      service.get(false, 'test/endpoint', params);
      const req = httpMock.expectOne(r => r.url === 'test/endpoint');
      expect(req.request.params.get('active')).toBe('true');
      expect(req.request.params.get('deleted')).toBe('false');
      req.flush({});
    });

    it('should call all callbacks in correct order on success', async () => {
      const callOrder: string[] = [];
      const onNext = jasmine.createSpy('onNext').and.callFake(() => callOrder.push('next'));
      const onComplete = jasmine.createSpy('onComplete').and.callFake(() => callOrder.push('complete'));

      service.get(true, 'test/endpoint', undefined, onNext, undefined, onComplete);
      const req = httpMock.expectOne('test/endpoint');
      req.flush({ data: 'test' });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(callOrder).toEqual(['next', 'complete']);
    });

    it('should call error callback on failure', async () => {
      const onError = jasmine.createSpy('onError');

      service.get(true, 'test/endpoint', undefined, undefined, onError);
      const req = httpMock.expectOne('test/endpoint');
      req.error(new ProgressEvent('error'), { status: 500 });

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(onError).toHaveBeenCalled();
    });

    it('should handle API status check being called multiple times concurrently', async () => {
      const promise1 = service.getAPIStatus();
      const promise2 = service.getAPIStatus(); // Should return same promise

      expect(promise1).toBe(promise2);

      const req = httpMock.expectOne('public/api-status/');
      req.flush({ branch: 'main' });

      const [result1, result2] = await Promise.all([promise1, promise2]);
      expect(result1).toBe('main');
      expect(result2).toBe('main');
    });

    it('should handle getAPIStatus when response has no branch', async () => {
      const promise = service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.flush({ status: 'ok' }); // No branch property

      const result = await promise;
      expect(result).toBe('');
    });

    it('should handle getAPIStatus with string response', async () => {
      const promise = service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.flush('ok'); // String response instead of object

      const result = await promise;
      expect(result).toBe('');
    });

    it('should reset outstanding API status check on error', async () => {
      const promise1 = service.getAPIStatus();
      const req1 = httpMock.expectOne('public/api-status/');
      req1.error(new ProgressEvent('error'), { status: 500 });

      await new Promise(resolve => setTimeout(resolve, 10));

      // Should be able to call again after error
      const promise2 = service.getAPIStatus();
      const req2 = httpMock.expectOne('public/api-status/');
      req2.flush({ branch: 'dev' });

      const result = await promise2;
      expect(result).toBe('dev');
    });

    it('should handle post with complex nested object', async () => {
      const complexData = {
        user: {
          name: 'Test',
          settings: {
            notifications: true,
            theme: 'dark'
          }
        },
        items: [1, 2, 3]
      };

      service.post(false, 'test/endpoint', complexData);
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.body).toEqual(complexData);
      req.flush({ success: true });
    });

    it('should handle put with array data', async () => {
      const arrayData = [{ id: 1 }, { id: 2 }, { id: 3 }];
      service.put(false, 'test/endpoint', arrayData);
      const req = httpMock.expectOne('test/endpoint');
      expect(req.request.body).toEqual(arrayData);
      req.flush({ success: true });
    });

    it('should not add duplicate offline banner', async () => {
      siteBannersSubject.next([
        new SiteBanner('0', 'Application is running in offline mode.')
      ]);

      // Trigger offline status
      service.getAPIStatus();
      const req = httpMock.expectOne('public/api-status/');
      req.error(new ProgressEvent('error'), { status: 0 });

      await new Promise(resolve => setTimeout(resolve, 10));

      // Should not call addSiteBanner since banner already exists
      expect(generalServiceSpy.addSiteBanner).not.toHaveBeenCalled();
    });
  });
});
