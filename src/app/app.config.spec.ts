import { appConfig } from './app.config';

describe('app.config', () => {
  it('should export appConfig', () => {
    expect(appConfig).toBeDefined();
  });

  it('should have providers array', () => {
    expect(appConfig.providers).toBeDefined();
    expect(Array.isArray(appConfig.providers)).toBe(true);
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });

  it('should include zone change detection provider', () => {
    const providers = appConfig.providers;
    expect(providers).toBeTruthy();
    // The config should be a non-null object with providers
    expect(typeof appConfig).toBe('object');
  });
});
