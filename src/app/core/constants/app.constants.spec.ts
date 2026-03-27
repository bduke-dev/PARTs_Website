import {
  ApiStatus,
  AuthCallState,
  BannerSeverity,
  DEFAULT_TIMEOUTS,
  HTTP_STATUS,
  CONNECTION_ERROR_STATUSES,
  STORAGE_KEYS,
  APP_ROUTES,
  ICON_SVG_BOOKSTACK,
  ICON_SVG_GITHUB,
  ICON_SVG_FRC,
  ICON_SVG_TBA,
  ICON_SVG_CHIEF_DELPHI,
  ICON_SVG_WPILIB,
} from './app.constants';

describe('app.constants', () => {
  describe('ApiStatus enum', () => {
    it('should have Processing value', () => {
      expect(ApiStatus.Processing).toBe('prcs');
    });

    it('should have Online value', () => {
      expect(ApiStatus.Online).toBe('on');
    });

    it('should have Offline value', () => {
      expect(ApiStatus.Offline).toBe('off');
    });
  });

  describe('AuthCallState enum', () => {
    it('should have Processing value', () => {
      expect(AuthCallState.Processing).toBe('prcs');
    });

    it('should have Complete value', () => {
      expect(AuthCallState.Complete).toBe('comp');
    });

    it('should have Failed value', () => {
      expect(AuthCallState.Failed).toBe('fail');
    });
  });

  describe('BannerSeverity enum', () => {
    it('should have High value of 1', () => {
      expect(BannerSeverity.High).toBe(1);
    });

    it('should have Medium value of 2', () => {
      expect(BannerSeverity.Medium).toBe(2);
    });

    it('should have Low value of 3', () => {
      expect(BannerSeverity.Low).toBe(3);
    });
  });

  describe('DEFAULT_TIMEOUTS', () => {
    it('should have BANNER timeout of 5000ms', () => {
      expect(DEFAULT_TIMEOUTS.BANNER).toBe(5000);
    });

    it('should have REQUEST timeout of 30000ms', () => {
      expect(DEFAULT_TIMEOUTS.REQUEST).toBe(30000);
    });

    it('should have REMEMBER_ME timeout of 30 days in ms', () => {
      expect(DEFAULT_TIMEOUTS.REMEMBER_ME).toBe(2592000000);
    });
  });

  describe('HTTP_STATUS', () => {
    it('should have OK status 200', () => {
      expect(HTTP_STATUS.OK).toBe(200);
    });

    it('should have CREATED status 201', () => {
      expect(HTTP_STATUS.CREATED).toBe(201);
    });

    it('should have NO_CONTENT status 204', () => {
      expect(HTTP_STATUS.NO_CONTENT).toBe(204);
    });

    it('should have BAD_REQUEST status 400', () => {
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
    });

    it('should have UNAUTHORIZED status 401', () => {
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401);
    });

    it('should have FORBIDDEN status 403', () => {
      expect(HTTP_STATUS.FORBIDDEN).toBe(403);
    });

    it('should have NOT_FOUND status 404', () => {
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
    });

    it('should have SERVER_ERROR status 500', () => {
      expect(HTTP_STATUS.SERVER_ERROR).toBe(500);
    });

    it('should have SERVICE_UNAVAILABLE status 503', () => {
      expect(HTTP_STATUS.SERVICE_UNAVAILABLE).toBe(503);
    });

    it('should have GATEWAY_TIMEOUT status 504', () => {
      expect(HTTP_STATUS.GATEWAY_TIMEOUT).toBe(504);
    });
  });

  describe('CONNECTION_ERROR_STATUSES', () => {
    it('should contain status 0', () => {
      expect(CONNECTION_ERROR_STATUSES).toContain(0);
    });

    it('should contain status 504', () => {
      expect(CONNECTION_ERROR_STATUSES).toContain(504);
    });

    it('should have exactly 2 entries', () => {
      expect(CONNECTION_ERROR_STATUSES.length).toBe(2);
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have TOKEN key', () => {
      expect(STORAGE_KEYS.TOKEN).toBe('token');
    });

    it('should have USER key', () => {
      expect(STORAGE_KEYS.USER).toBe('user');
    });

    it('should have THEME key', () => {
      expect(STORAGE_KEYS.THEME).toBe('theme');
    });

    it('should have REMEMBER_ME key', () => {
      expect(STORAGE_KEYS.REMEMBER_ME).toBe('rememberMe');
    });
  });

  describe('APP_ROUTES', () => {
    it('should have HOME route', () => {
      expect(APP_ROUTES.HOME).toBe('');
    });

    it('should have LOGIN route', () => {
      expect(APP_ROUTES.LOGIN).toBe('login');
    });

    it('should have ADMIN route', () => {
      expect(APP_ROUTES.ADMIN).toBe('admin');
    });

    it('should have SCOUTING route', () => {
      expect(APP_ROUTES.SCOUTING).toBe('scouting');
    });

    it('should have SCOUTING_ADMIN route', () => {
      expect(APP_ROUTES.SCOUTING_ADMIN).toBe('scouting-admin');
    });
  });

  describe('SVG Icons', () => {
    it('should have ICON_SVG_BOOKSTACK defined as a non-empty string', () => {
      expect(typeof ICON_SVG_BOOKSTACK).toBe('string');
      expect(ICON_SVG_BOOKSTACK.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_BOOKSTACK contain svg element', () => {
      expect(ICON_SVG_BOOKSTACK).toContain('<svg');
    });

    it('should have ICON_SVG_GITHUB defined as a non-empty string', () => {
      expect(typeof ICON_SVG_GITHUB).toBe('string');
      expect(ICON_SVG_GITHUB.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_GITHUB contain svg element', () => {
      expect(ICON_SVG_GITHUB).toContain('<svg');
    });

    it('should have ICON_SVG_FRC defined as a non-empty string', () => {
      expect(typeof ICON_SVG_FRC).toBe('string');
      expect(ICON_SVG_FRC.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_FRC contain svg element', () => {
      expect(ICON_SVG_FRC).toContain('<svg');
    });

    it('should have ICON_SVG_TBA defined as a non-empty string', () => {
      expect(typeof ICON_SVG_TBA).toBe('string');
      expect(ICON_SVG_TBA.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_TBA contain svg element', () => {
      expect(ICON_SVG_TBA).toContain('<svg');
    });

    it('should have ICON_SVG_CHIEF_DELPHI defined as a non-empty string', () => {
      expect(typeof ICON_SVG_CHIEF_DELPHI).toBe('string');
      expect(ICON_SVG_CHIEF_DELPHI.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_CHIEF_DELPHI contain svg element', () => {
      expect(ICON_SVG_CHIEF_DELPHI).toContain('<svg');
    });

    it('should have ICON_SVG_WPILIB defined as a non-empty string', () => {
      expect(typeof ICON_SVG_WPILIB).toBe('string');
      expect(ICON_SVG_WPILIB.trim().length).toBeGreaterThan(0);
    });

    it('should have ICON_SVG_WPILIB contain svg element', () => {
      expect(ICON_SVG_WPILIB).toContain('<svg');
    });
  });
});
