import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { APIService } from '@app/core/services/api.service';
import { AuthService } from '@app/auth/services/auth.service';
import { GeneralService } from '@app/core/services/general.service';
import { NavigationService, NavigationState } from '@app/navigation/services/navigation.service';
import { NotificationsService } from '@app/core/services/notifications.service';
import { PwaService } from '@app/core/services/pwa.service';
import { createMockSwPush } from '../../../../test-helpers';
import { NavigationComponent } from './navigation.component';
import { User } from '@app/auth/models/user.models';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockAPI: jasmine.SpyObj<APIService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockGS: jasmine.SpyObj<GeneralService>;
  let mockNavService: jasmine.SpyObj<NavigationService>;
  let mockNS: jasmine.SpyObj<NotificationsService>;
  let mockPwa: jasmine.SpyObj<PwaService>;
  let userSubject: BehaviorSubject<User>;
  let outstandingCallsSubject: BehaviorSubject<number>;
  let navigationStateSubject: BehaviorSubject<NavigationState>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<User>(new User());
    outstandingCallsSubject = new BehaviorSubject<number>(0);
    navigationStateSubject = new BehaviorSubject<NavigationState>(NavigationState.expanded);
    mockAPI = jasmine.createSpyObj('APIService', ['get', 'post']);
    mockAPI.get.and.callFake((_: boolean, __: string, ___?: any, successCb?: (result: any) => void): Promise<any> => { if (successCb) successCb([]); return Promise.resolve([]) as any; });
    mockAuthService = jasmine.createSpyObj('AuthService', ['logOut', 'isAdmin'], {
      user: userSubject.asObservable(),
      userLinks: new BehaviorSubject<any[]>([]).asObservable(),
    });
    mockAuthService.isAdmin.and.returnValue(false);
    mockGS = jasmine.createSpyObj('GeneralService', [
      'getNextGsId', 'incrementOutstandingCalls', 'decrementOutstandingCalls', 'isMobile', 'getAppSize',
      'navigateByUrl', 'addBanner', 'getBanners', 'removeBanner',
    ]);
    mockGS.getNextGsId.and.returnValue('gs-1');
    mockGS.getBanners.and.returnValue([]);
    mockGS.currentOutstandingCalls = outstandingCallsSubject.asObservable();
    mockGS.siteBanners = new BehaviorSubject<any[]>([]).asObservable();
    mockGS.scrollPosition$ = new BehaviorSubject<number>(0).asObservable();
    mockNavService = jasmine.createSpyObj('NavigationService', ['setNavigationState', 'setSubPages'], {
      currentNavigationState: navigationStateSubject.asObservable(),
      subPage: new BehaviorSubject<string>('-1').asObservable(),
      allSubPages: [],
      applicationMenu: [],
      pagesWithNavigation: [],
    });
    mockNS = jasmine.createSpyObj('NotificationsService', ['getNotifications', 'getMessages'], {
      notifications: new BehaviorSubject([]).asObservable(),
      messages: new BehaviorSubject([]).asObservable(),
    });
    mockPwa = jasmine.createSpyObj('PwaService', ['checkForUpdate'], {
      promptEvent: new Subject(),
      installEligible: new BehaviorSubject<boolean>(false).asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: SwPush, useValue: createMockSwPush() },
        { provide: APIService, useValue: mockAPI },
        { provide: AuthService, useValue: mockAuthService },
        { provide: GeneralService, useValue: mockGS },
        { provide: NavigationService, useValue: mockNavService },
        { provide: NotificationsService, useValue: mockNS },
        { provide: PwaService, useValue: mockPwa },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navExpanded initialized', () => {
    expect(typeof component.navExpanded).toBe('boolean');
  });

  it('should have loading initialized to false', () => {
    expect(component.loading).toBeFalse();
  });

  it('should update loading when outstandingCalls changes to > 0', () => {
    outstandingCallsSubject.next(1);
    expect(component.loading).toBe(true);
  });

  it('should update user when user observable emits', () => {
    const user = new User();
    user.username = 'testuser';
    userSubject.next(user);
    expect(component.user.username).toBe('testuser');
  });

  it('should toggle navExpanded on toggleForceNavExpanded', () => {
    const initial = component.navExpanded;
    component.toggleForceNavExpanded();
    expect(component.navExpanded).toBe(!initial);
    expect(mockNavService.setNavigationState).toHaveBeenCalled();
  });

  it('should set navExpanded to true with setNavExpandedCollapsed(true)', () => {
    component.setNavExpandedCollapsed(true);
    expect(component.navExpanded).toBe(true);
    expect(mockNavService.setNavigationState).toHaveBeenCalledWith(NavigationState.expanded);
  });

  it('should set navExpanded to false with setNavExpandedCollapsed(false)', () => {
    component.setNavExpandedCollapsed(false);
    expect(component.navExpanded).toBe(false);
    expect(mockNavService.setNavigationState).toHaveBeenCalledWith(NavigationState.collapsed);
  });

  it('should toggle showNav on toggleShowNav', () => {
    const initial = component.showNav;
    component.toggleShowNav();
    expect(component.showNav).toBe(!initial);
  });

  it('should close subnav on closeSubNav when subNav is empty', () => {
    component.subNav = '';
    expect(() => component.closeSubNav()).not.toThrow();
  });

  it('should close subnav on closeSubNav when subNav is set', () => {
    component.subNav = 'test-id';
    component.closeSubNav();
    expect(component.subNav).toBe('');
  });

  it('should call closeSubNav with resetNames=true', () => {
    component.subNav = 'test-id';
    component.closeSubNav(true);
    expect(component.subNav).toBe('');
  });

  it('should call xsToggleSearch', () => {
    expect(() => component.xsToggleSearch()).not.toThrow();
  });

  it('should call hideNotificationModal', () => {
    component.showNotificationModalVisible = true;
    component.hideNotificationModal();
    expect(component.showNotificationModalVisible).toBe(false);
  });

  it('should call showNotificationModal', () => {
    component.showNotificationModalVisible = false;
    component.showNotificationModal();
    expect(component.showNotificationModalVisible).toBe(true);
  });

  it('should call hideMessageModal', () => {
    component.showMessageModalVisible = true;
    component.hideMessageModal();
    expect(component.showMessageModalVisible).toBe(false);
  });

  it('should call showMessageModal', () => {
    component.showMessageModalVisible = false;
    component.showMessageModal();
    expect(component.showMessageModalVisible).toBe(true);
  });

  it('should call hideUserModal', () => {
    component.showUserModalVisible = true;
    component.hideUserModal();
    expect(component.showUserModalVisible).toBe(false);
  });

  it('should call logOut', () => {
    component.logOut();
    expect(mockAuthService.logOut).toHaveBeenCalled();
  });

  it('should call closeNavOnMobile', () => {
    expect(() => component.closeNavOnMobile()).not.toThrow();
  });

  it('should call dismissBanners', () => {
    expect(() => component.dismissBanners()).not.toThrow();
  });

  it('should compute getNavPageID correctly', () => {
    const id = component.getNavPageID('admin');
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should handle onResize event', () => {
    expect(() => component.onResize(new Event('resize'))).not.toThrow();
  });

  it('should handle onScroll event', () => {
    expect(() => component.onScroll({ target: { scrollTop: 100 } })).not.toThrow();
  });

  it('should set navigation state to collapsed when setNavCollapsedHidden(false)', () => {
    component.setNavCollapsedHidden(false);
    expect(component.showNav).toBe(false);
    expect(mockNavService.setNavigationState).toHaveBeenCalledWith(NavigationState.hidden);
  });

  it('should set navigation state to collapsed when setNavCollapsedHidden(true)', () => {
    component.setNavCollapsedHidden(true);
    expect(component.showNav).toBe(true);
    expect(mockNavService.setNavigationState).toHaveBeenCalledWith(NavigationState.collapsed);
  });
});
