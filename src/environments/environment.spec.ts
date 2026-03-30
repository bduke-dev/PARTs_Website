import { environment as prodEnvironment } from './environment';
import { environment as devEnvironment } from './environment.development';
import { environment as uatEnvironment } from './environment.uat';
import { Environment } from './environment.interface';

describe('Environment configurations', () => {
  const requiredFields: (keyof Environment)[] = [
    'production',
    'version',
    'baseUrl',
    'backupBaseUrl',
    'tokenString',
    'loggedInHereBefore',
    'userSettings',
    'rememberMe',
    'environment',
  ];

  function validateEnvironment(env: Environment, label: string) {
    describe(`${label}`, () => {
      requiredFields.forEach(field => {
        it(`should have required field: ${field}`, () => {
          expect(env[field]).toBeDefined();
        });
      });

      it('should have production as boolean', () => {
        expect(typeof env.production).toBe('boolean');
      });

      it('should have version as string', () => {
        expect(typeof env.version).toBe('string');
      });

      it('should have baseUrl as string', () => {
        expect(typeof env.baseUrl).toBe('string');
      });

      it('should have tokenString as string', () => {
        expect(typeof env.tokenString).toBe('string');
      });

      it('should have loggedInHereBefore as string', () => {
        expect(typeof env.loggedInHereBefore).toBe('string');
      });

      it('should have userSettings as string', () => {
        expect(typeof env.userSettings).toBe('string');
      });

      it('should have rememberMe as string', () => {
        expect(typeof env.rememberMe).toBe('string');
      });

      it('should have environment as string', () => {
        expect(typeof env.environment).toBe('string');
      });
    });
  }

  validateEnvironment(prodEnvironment, 'Production environment');
  validateEnvironment(devEnvironment, 'Development environment');
  validateEnvironment(uatEnvironment, 'UAT environment');

  describe('Production environment specific values', () => {
    it('should be production', () => {
      expect(prodEnvironment.production).toBe(true);
    });

    it('should point to production API', () => {
      expect(prodEnvironment.baseUrl).toContain('parts3492.org');
    });
  });

  describe('Development environment specific values', () => {
    it('should not be production', () => {
      expect(devEnvironment.production).toBe(false);
    });

    it('should have local environment label', () => {
      expect(devEnvironment.environment).toBe('local');
    });

    it('should point to localhost', () => {
      expect(devEnvironment.baseUrl).toContain('127.0.0.1');
    });

    it('should have local version', () => {
      expect(devEnvironment.version).toBe('local');
    });
  });

  describe('UAT environment specific values', () => {
    it('should not be production', () => {
      expect(uatEnvironment.production).toBe(false);
    });

    it('should have UAT base URL', () => {
      expect(uatEnvironment.baseUrl.length).toBeGreaterThan(0);
    });
  });

  describe('Token uniqueness', () => {
    it('should have different tokenStrings across environments', () => {
      const tokens = new Set([prodEnvironment.tokenString, devEnvironment.tokenString, uatEnvironment.tokenString]);
      expect(tokens.size).toBeGreaterThan(1);
    });

    it('should have different loggedInHereBefore keys across environments', () => {
      const keys = new Set([
        prodEnvironment.loggedInHereBefore,
        devEnvironment.loggedInHereBefore,
        uatEnvironment.loggedInHereBefore
      ]);
      expect(keys.size).toBeGreaterThan(1);
    });
  });
});
