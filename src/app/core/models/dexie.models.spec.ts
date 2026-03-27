import { EntityStateEnum } from './dexie.models';

describe('dexie.models', () => {
  describe('EntityStateEnum', () => {
    it('should have Added value of 0', () => {
      expect(EntityStateEnum.Added).toBe(0);
    });

    it('should have Deleted value of 1', () => {
      expect(EntityStateEnum.Deleted).toBe(1);
    });

    it('should have Modified value of 2', () => {
      expect(EntityStateEnum.Modified).toBe(2);
    });

    it('should have unique numeric values for all states', () => {
      const values = [EntityStateEnum.Added, EntityStateEnum.Deleted, EntityStateEnum.Modified];
      const unique = new Set(values);
      expect(unique.size).toBe(3);
    });
  });
});
