import { AuthPermission, AuthGroup, User } from './user.models';

describe('user.models', () => {
  describe('AuthPermission', () => {
    it('should create with default values', () => {
      const perm = new AuthPermission();
      expect(perm.id).toBeNaN();
      expect(perm.codename).toBe('');
      expect(perm.content_type).toBeNaN();
      expect(perm.name).toBe('');
    });

    it('should allow setting properties', () => {
      const perm = new AuthPermission();
      perm.codename = 'can_view_admin';
      perm.name = 'Can View Admin';
      expect(perm.codename).toBe('can_view_admin');
      expect(perm.name).toBe('Can View Admin');
    });
  });

  describe('AuthGroup', () => {
    it('should have empty permissions array by default', () => {
      const group = new AuthGroup();
      expect(group.permissions).toEqual([]);
    });

    it('should allow adding permissions', () => {
      const group = new AuthGroup();
      const perm = new AuthPermission();
      perm.codename = 'can_edit';
      group.permissions.push(perm);
      expect(group.permissions.length).toBe(1);
      expect(group.permissions[0].codename).toBe('can_edit');
    });
  });

  describe('User', () => {
    it('should create with default values', () => {
      const user = new User();
      expect(user.id).toBeNaN();
      expect(user.username).toBe('');
      expect(user.email).toBe('');
      expect(user.name).toBe('');
      expect(user.first_name).toBe('');
      expect(user.last_name).toBe('');
      expect(user.is_active).toBe(false);
      expect(user.discord_user_id).toBe('');
      expect(user.phone).toBe('');
      expect(user.phone_type).toBe('');
      expect(user.image).toBe('');
    });

    it('should have empty groups array by default', () => {
      const user = new User();
      expect(user.groups).toEqual([]);
    });

    it('should have empty permissions array by default', () => {
      const user = new User();
      expect(user.permissions).toEqual([]);
    });

    it('should have empty links array by default', () => {
      const user = new User();
      expect(user.links).toEqual([]);
    });

    it('should compute get_full_name correctly', () => {
      const user = new User();
      user.first_name = 'John';
      user.last_name = 'Doe';
      expect(user.get_full_name()).toBe('John Doe');
    });

    it('should compute get_full_name with empty names', () => {
      const user = new User();
      expect(user.get_full_name()).toBe(' ');
    });

    it('should allow setting multiple properties', () => {
      const user = new User();
      user.username = 'jdoe';
      user.email = 'jdoe@example.com';
      user.first_name = 'John';
      user.last_name = 'Doe';
      user.is_active = true;
      expect(user.username).toBe('jdoe');
      expect(user.email).toBe('jdoe@example.com');
      expect(user.get_full_name()).toBe('John Doe');
    });
  });
});
