import {
  createMockRouter,
  createMockActivatedRoute,
  createMockAPIService,
  createMockAuthService,
  createMockGeneralService,
  createMockCacheService,
  createMockScoutingService,
  getCommonTestProviders,
  createMockModalService,
  createMockNavigationService,
  createMockSwPush,
  createMockSwUpdate,
} from './test-helpers';

describe('test-helpers', () => {
  describe('createMockRouter', () => {
    it('should create a mock router object', () => {
      const router = createMockRouter();
      expect(router).toBeDefined();
    });

    it('should have events observable', () => {
      const router = createMockRouter();
      expect(router.events).toBeDefined();
    });

    it('should have navigate spy', () => {
      const router = createMockRouter();
      expect(router.navigate).toBeDefined();
      expect(typeof router.navigate).toBe('function');
    });

    it('should have navigateByUrl spy', () => {
      const router = createMockRouter();
      expect(router.navigateByUrl).toBeDefined();
    });

    it('should return a Promise from navigate', async () => {
      const router = createMockRouter();
      const result = router.navigate(['/test']);
      expect(result).toBeInstanceOf(Promise);
      await expectAsync(result).toBeResolvedTo(true);
    });

    it('should have url property', () => {
      const router = createMockRouter();
      expect(router.url).toBe('/');
    });

    it('should have routerState with root', () => {
      const router = createMockRouter();
      expect(router.routerState).toBeDefined();
      expect(router.routerState.root).toBeDefined();
    });
  });

  describe('createMockActivatedRoute', () => {
    it('should create a mock activated route', () => {
      const route = createMockActivatedRoute();
      expect(route).toBeDefined();
    });

    it('should have params observable', (done) => {
      const route = createMockActivatedRoute({ id: '123' });
      route.params.subscribe((params: any) => {
        expect(params.id).toBe('123');
        done();
      });
    });

    it('should have queryParams observable', (done) => {
      const route = createMockActivatedRoute({}, { filter: 'active' });
      route.queryParams.subscribe((queryParams: any) => {
        expect(queryParams.filter).toBe('active');
        done();
      });
    });

    it('should have data observable', (done) => {
      const route = createMockActivatedRoute({}, {}, { title: 'Test' });
      route.data.subscribe((data: any) => {
        expect(data.title).toBe('Test');
        done();
      });
    });

    it('should have snapshot with params', () => {
      const route = createMockActivatedRoute({ id: '456' });
      expect(route.snapshot.params.id).toBe('456');
    });

    it('should have snapshot paramMap.get', () => {
      const route = createMockActivatedRoute({ id: '789' });
      expect(route.snapshot.paramMap.get('id')).toBe('789');
    });

    it('should have snapshot queryParamMap.get', () => {
      const route = createMockActivatedRoute({}, { page: '2' });
      expect(route.snapshot.queryParamMap.get('page')).toBe('2');
    });

    it('should use defaults when no params provided', () => {
      const route = createMockActivatedRoute();
      expect(route.snapshot.params).toEqual({});
      expect(route.snapshot.queryParams).toEqual({});
    });
  });

  describe('createMockAPIService', () => {
    it('should create a mock API service', () => {
      const api = createMockAPIService();
      expect(api).toBeDefined();
    });

    it('should have get spy', () => {
      const api = createMockAPIService();
      expect(api.get).toBeDefined();
    });

    it('should have post spy', () => {
      const api = createMockAPIService();
      expect(api.post).toBeDefined();
    });

    it('should have put spy', () => {
      const api = createMockAPIService();
      expect(api.put).toBeDefined();
    });

    it('should have delete spy', () => {
      const api = createMockAPIService();
      expect(api.delete).toBeDefined();
    });

    it('should have patch spy', () => {
      const api = createMockAPIService();
      expect(api.patch).toBeDefined();
    });

    it('should have apiStatus observable', (done) => {
      const api = createMockAPIService();
      api.apiStatus.subscribe((status: any) => {
        expect(status).toBeDefined();
        done();
      });
    });

    it('should have getAPIStatus spy', async () => {
      const api = createMockAPIService();
      expect(api.getAPIStatus).toBeDefined();
      const result = await api.getAPIStatus();
      expect(result).toBeDefined();
    });
  });

  describe('createMockAuthService', () => {
    it('should create a mock auth service', () => {
      const auth = createMockAuthService();
      expect(auth).toBeDefined();
    });

    it('should have user observable', (done) => {
      const auth = createMockAuthService();
      auth.user.subscribe((user: any) => {
        expect(user).toBeDefined();
        done();
      });
    });

    it('should have loggedIn observable', (done) => {
      const auth = createMockAuthService();
      auth.loggedIn.subscribe((value: boolean) => {
        expect(typeof value).toBe('boolean');
        done();
      });
    });

    it('should have authInFlight observable', (done) => {
      const auth = createMockAuthService();
      auth.authInFlight.subscribe((value: any) => {
        expect(value).toBeDefined();
        done();
      });
    });

    it('should have login spy', async () => {
      const auth = createMockAuthService();
      expect(auth.login).toBeDefined();
    });

    it('should have logout spy', async () => {
      const auth = createMockAuthService();
      expect(auth.logout).toBeDefined();
    });

    it('should have previouslyAuthorized spy', () => {
      const auth = createMockAuthService();
      expect(auth.previouslyAuthorized).toBeDefined();
    });
  });

  describe('createMockGeneralService', () => {
    it('should create a mock general service', () => {
      const gs = createMockGeneralService();
      expect(gs).toBeDefined();
    });

    it('should have addSiteBanner spy', () => {
      const gs = createMockGeneralService();
      expect(gs.addSiteBanner).toBeDefined();
    });

    it('should have removeBanner spy', () => {
      const gs = createMockGeneralService();
      expect(gs.removeBanner).toBeDefined();
    });

    it('should have siteBanners observable', (done) => {
      const gs = createMockGeneralService();
      gs.siteBanners.subscribe((banners: any[]) => {
        expect(Array.isArray(banners)).toBe(true);
        done();
      });
    });

    it('should have banners observable', (done) => {
      const gs = createMockGeneralService();
      gs.banners.subscribe((banners: any[]) => {
        expect(Array.isArray(banners)).toBe(true);
        done();
      });
    });

    it('should have getAppSize spy', () => {
      const gs = createMockGeneralService();
      expect(gs.getAppSize).toBeDefined();
      expect(gs.getAppSize()).toBe(0);
    });

    it('should have cloneObject spy', () => {
      const gs = createMockGeneralService();
      const obj = { name: 'test' };
      const clone = gs.cloneObject(obj);
      expect(clone).toEqual(obj);
    });

    it('should have strNoE spy', () => {
      const gs = createMockGeneralService();
      expect(gs.strNoE).toBeDefined();
      expect(gs.strNoE('test')).toBe(false);
    });
  });

  describe('createMockCacheService', () => {
    it('should create a mock cache service', () => {
      const cache = createMockCacheService();
      expect(cache).toBeDefined();
    });

    it('should have get spy', () => {
      const cache = createMockCacheService();
      expect(cache.get).toBeDefined();
    });

    it('should have set spy', () => {
      const cache = createMockCacheService();
      expect(cache.set).toBeDefined();
    });

    it('should have delete spy', () => {
      const cache = createMockCacheService();
      expect(cache.delete).toBeDefined();
    });

    it('should have clear spy', () => {
      const cache = createMockCacheService();
      expect(cache.clear).toBeDefined();
    });
  });

  describe('createMockScoutingService', () => {
    it('should create a mock scouting service', () => {
      const scouting = createMockScoutingService();
      expect(scouting).toBeDefined();
    });

    it('should have currentSeason observable', (done) => {
      const scouting = createMockScoutingService();
      scouting.currentSeason.subscribe((season: any) => {
        expect(season).toBeDefined();
        done();
      });
    });

    it('should have getCurrentSeason spy', async () => {
      const scouting = createMockScoutingService();
      expect(scouting.getCurrentSeason).toBeDefined();
    });

    it('should have outstandingResponsesUploaded observable', (done) => {
      const scouting = createMockScoutingService();
      scouting.outstandingResponsesUploaded.subscribe((value: any) => {
        expect(value).toBeDefined();
        done();
      });
    });
  });

  describe('getCommonTestProviders', () => {
    it('should return an array of providers', () => {
      const providers = getCommonTestProviders();
      expect(Array.isArray(providers)).toBe(true);
      expect(providers.length).toBeGreaterThan(0);
    });
  });

  describe('createMockModalService', () => {
    it('should create a mock modal service', () => {
      const modal = createMockModalService();
      expect(modal).toBeDefined();
    });

    it('should have open spy', () => {
      const modal = createMockModalService();
      expect(modal.open).toBeDefined();
    });

    it('should have close spy', () => {
      const modal = createMockModalService();
      expect(modal.close).toBeDefined();
    });

    it('should have isOpen property', () => {
      const modal = createMockModalService();
      expect(modal.isOpen).toBe(false);
    });

    it('should have triggerConfirm spy', () => {
      const modal = createMockModalService();
      expect(modal.triggerConfirm).toBeDefined();
    });

    it('should have triggerError spy', () => {
      const modal = createMockModalService();
      expect(modal.triggerError).toBeDefined();
    });
  });

  describe('createMockNavigationService', () => {
    it('should create a mock navigation service', () => {
      const nav = createMockNavigationService();
      expect(nav).toBeDefined();
    });

    it('should have navigate spy', () => {
      const nav = createMockNavigationService();
      expect(nav.navigate).toBeDefined();
    });

    it('should have goBack spy', () => {
      const nav = createMockNavigationService();
      expect(nav.goBack).toBeDefined();
    });

    it('should have getCurrentRoute spy', () => {
      const nav = createMockNavigationService();
      expect(nav.getCurrentRoute).toBeDefined();
      expect(nav.getCurrentRoute()).toBe('/');
    });
  });

  describe('createMockSwPush', () => {
    it('should create a mock SwPush', () => {
      const swPush = createMockSwPush();
      expect(swPush).toBeDefined();
    });

    it('should have messages observable', (done) => {
      const swPush = createMockSwPush();
      swPush.messages.subscribe(() => done());
      swPush._messagesSubject.next({});
    });

    it('should have notificationClicks observable', () => {
      const swPush = createMockSwPush();
      expect(swPush.notificationClicks).toBeDefined();
    });

    it('should have subscription observable', (done) => {
      const swPush = createMockSwPush();
      swPush.subscription.subscribe((value: any) => {
        expect(value).toBeNull();
        done();
      });
    });

    it('should have isEnabled as false', () => {
      const swPush = createMockSwPush();
      expect(swPush.isEnabled).toBe(false);
    });

    it('should have requestSubscription spy', async () => {
      const swPush = createMockSwPush();
      expect(swPush.requestSubscription).toBeDefined();
    });

    it('should have unsubscribe spy', () => {
      const swPush = createMockSwPush();
      expect(swPush.unsubscribe).toBeDefined();
    });
  });

  describe('createMockSwUpdate', () => {
    it('should create a mock SwUpdate', () => {
      const swUpdate = createMockSwUpdate();
      expect(swUpdate).toBeDefined();
    });

    it('should have versionUpdates observable', (done) => {
      const swUpdate = createMockSwUpdate();
      swUpdate.versionUpdates.subscribe(() => done());
    });

    it('should have unrecoverable observable', (done) => {
      const swUpdate = createMockSwUpdate();
      swUpdate.unrecoverable.subscribe(() => done());
    });

    it('should have isEnabled as false', () => {
      const swUpdate = createMockSwUpdate();
      expect(swUpdate.isEnabled).toBe(false);
    });

    it('should have checkForUpdate spy', async () => {
      const swUpdate = createMockSwUpdate();
      expect(swUpdate.checkForUpdate).toBeDefined();
      const result = await swUpdate.checkForUpdate();
      expect(result).toBe(false);
    });

    it('should have activateUpdate spy', async () => {
      const swUpdate = createMockSwUpdate();
      expect(swUpdate.activateUpdate).toBeDefined();
      const result = await swUpdate.activateUpdate();
      expect(result).toBe(true);
    });
  });
});
