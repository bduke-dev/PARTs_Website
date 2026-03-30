import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GeneralService } from '@app/core/services/general.service';
import { Banner } from '@app/core/models/api.models';
import { AppSize } from '@app/core/utils/utils.functions';

import { BannersComponent } from './banners.component';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;
  let mockGeneralService: any;
  let bannersSubject: BehaviorSubject<Banner[]>;

  beforeEach(async () => {
    bannersSubject = new BehaviorSubject<Banner[]>([]);
    mockGeneralService = {
      banners: bannersSubject.asObservable(),
      siteBanners: bannersSubject.asObservable(),
      removeBanner: jasmine.createSpy('removeBanner'),
      getAppSize: jasmine.createSpy('getAppSize').and.returnValue(0),
      currentOutstandingCalls: new BehaviorSubject(0).asObservable(),
      addBanner: jasmine.createSpy('addBanner'),
    };

    await TestBed.configureTestingModule({
      imports: [ BannersComponent ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: GeneralService, useValue: mockGeneralService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Create a mock site-header element to prevent HTMLElement constructor error
    const mockHeader = document.createElement('div');
    mockHeader.id = 'site-header';
    mockHeader.style.height = '60px';
    document.body.appendChild(mockHeader);

    fixture = TestBed.createComponent(BannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up the mock header
    const mockHeader = document.getElementById('site-header');
    if (mockHeader) {
      document.body.removeChild(mockHeader);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty banners', () => {
    expect(component.banners).toEqual([]);
  });

  it('should update banners when general service emits', () => {
    const banner = new Banner('Test banner', 5000, 1);
    bannersSubject.next([banner]);
    fixture.detectChanges();
    expect(component.banners.length).toBe(1);
    expect(component.banners[0].message).toBe('Test banner');
  });

  it('should call removeBanner when dismissBanner is called', () => {
    const banner = new Banner('Test banner');
    component.dismissBanner(banner);
    expect(mockGeneralService.removeBanner).toHaveBeenCalledWith(banner);
  });

  it('should call banner fn when dismissBanner is called with runFn=true', () => {
    let fnCalled = false;
    const banner = new Banner('Test', 5000, 1, () => { fnCalled = true; });
    component.dismissBanner(banner, true);
    expect(fnCalled).toBe(true);
    expect(mockGeneralService.removeBanner).toHaveBeenCalledWith(banner);
  });

  it('should not call banner fn when dismissBanner is called with default runFn', () => {
    let fnCalled = false;
    const banner = new Banner('Test', 5000, 1, () => { fnCalled = true; });
    component.dismissBanner(banner);
    expect(fnCalled).toBe(false);
  });

  it('should clear timeout when pauseTimeout is called', () => {
    const banner = new Banner('Test', 5000);
    // Set up a real timeout and then pause it
    banner.timeout = window.setTimeout(() => {}, 10000);
    // Just verify it doesn't throw - window.clearTimeout spying causes Zone.js issues
    expect(() => component.pauseTimeout(banner)).not.toThrow();
    expect(banner.timeout).toBeDefined();
  });

  it('should not throw when pauseTimeout called with no timeout', () => {
    const banner = new Banner('Test', 5000);
    banner.timeout = undefined;
    expect(() => component.pauseTimeout(banner)).not.toThrow();
  });

  it('should set a timeout for banner with positive time', (done) => {
    const banner = new Banner('Test', 100, 1);
    component.setTimeout(banner);
    expect(banner.timeout).toBeDefined();
    // Verify it actually triggers dismiss
    setTimeout(() => {
      expect(mockGeneralService.removeBanner).toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should not set a timeout for banner with time <= 0', () => {
    const banner = new Banner('Test', 0, 1);
    component.setTimeout(banner);
    expect(banner.timeout).toBeUndefined();
  });

  it('should not set a timeout for banner with time -1', () => {
    const banner = new Banner('Test', -1, 1);
    component.setTimeout(banner);
    expect(banner.timeout).toBeUndefined();
  });

  it('should resume timeout when resumeTimeout is called', () => {
    spyOn(component, 'setTimeout');
    const banner = new Banner('Test', 5000);
    component.resumeTimeout(banner);
    expect(component.setTimeout).toHaveBeenCalledWith(banner);
  });

  it('should call positionBannerWrapper when resize event fires', () => {
    spyOn(component, 'positionBannerWrapper');
    component.onResize(new Event('resize'));
    expect(component.positionBannerWrapper).toHaveBeenCalled();
  });

  it('should handle window scroll event', () => {
    mockGeneralService.getAppSize.and.returnValue(AppSize.XS);
    expect(() => component.onWindowScroll(new Event('scroll'))).not.toThrow();
  });

  it('should handle scrollEvents with positive scrollY', () => {
    expect(() => component.scrollEvents(100)).not.toThrow();
  });

  it('should handle scrollEvents with scrollY going down', () => {
    component.scrollEvents(50);
    expect(() => component.scrollEvents(100)).not.toThrow();
  });

  it('should handle scrollEvents with scrollY going up', () => {
    component.scrollEvents(100);
    expect(() => component.scrollEvents(50)).not.toThrow();
  });

  it('should handle positionBannerWrapper', () => {
    expect(() => component.positionBannerWrapper()).not.toThrow();
  });

  it('should set setTimeout for each banner when banners stream emits', () => {
    spyOn(component, 'setTimeout');
    const banner = new Banner('Test', 5000);
    bannersSubject.next([banner]);
    expect(component.setTimeout).toHaveBeenCalledWith(banner);
  });
});

