import { APIStatus, Banner, SiteBanner } from './api.models';

describe('api.models', () => {
  describe('APIStatus enum', () => {
    it('should have prcs value', () => {
      expect(APIStatus.prcs).toBe('prcs');
    });

    it('should have on value', () => {
      expect(APIStatus.on).toBe('on');
    });

    it('should have off value', () => {
      expect(APIStatus.off).toBe('off');
    });
  });

  describe('Banner', () => {
    it('should create with default values', () => {
      const banner = new Banner();
      expect(banner.message).toBe('');
      expect(banner.time).toBe(-1);
      expect(banner.severity).toBe(3);
      expect(banner.dismissed).toBe(false);
      expect(banner.timeout).toBeUndefined();
    });

    it('should create with provided message', () => {
      const banner = new Banner('Test message');
      expect(banner.message).toBe('Test message');
    });

    it('should create with provided time', () => {
      const banner = new Banner('msg', 5000);
      expect(banner.time).toBe(5000);
    });

    it('should create with provided severity', () => {
      const banner = new Banner('msg', 5000, 1);
      expect(banner.severity).toBe(1);
    });

    it('should create with provided fn', () => {
      let called = false;
      const fn = () => { called = true; };
      const banner = new Banner('msg', 5000, 1, fn);
      banner.fn();
      expect(called).toBe(true);
    });

    it('should have default fn that does nothing', () => {
      const banner = new Banner();
      expect(() => banner.fn()).not.toThrow();
    });

    it('should implement IBanner interface', () => {
      const banner = new Banner('test', 1000, 2);
      expect(banner.severity).toBeDefined();
      expect(banner.message).toBeDefined();
      expect(banner.time).toBeDefined();
      expect(banner.dismissed).toBeDefined();
      expect(banner.fn).toBeDefined();
    });
  });

  describe('SiteBanner', () => {
    it('should create with default values', () => {
      const banner = new SiteBanner();
      expect(banner.id).toBe('');
      expect(banner.message).toBe('');
      expect(banner.time).toBe(-1);
      expect(banner.dismissed).toBe(false);
      expect(banner.timeout).toBeUndefined();
    });

    it('should create with provided id', () => {
      const banner = new SiteBanner('banner-1');
      expect(banner.id).toBe('banner-1');
    });

    it('should create with provided message', () => {
      const banner = new SiteBanner('id', 'Hello World');
      expect(banner.message).toBe('Hello World');
    });

    it('should create with provided time', () => {
      const banner = new SiteBanner('id', 'msg', 3000);
      expect(banner.time).toBe(3000);
    });

    it('should implement ISiteBanner interface', () => {
      const banner = new SiteBanner('id', 'msg', 1000);
      expect(banner.id).toBeDefined();
      expect(banner.message).toBeDefined();
      expect(banner.time).toBeDefined();
      expect(banner.dismissed).toBeDefined();
    });
  });
});
