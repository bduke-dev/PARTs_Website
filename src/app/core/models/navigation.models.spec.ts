import { SubLink, Link } from './navigation.models';
import { AuthPermission } from '@app/auth/models/user.models';

describe('navigation.models', () => {
  describe('SubLink', () => {
    it('should create with required parameters', () => {
      const link = new SubLink('Dashboard', '/dashboard');
      expect(link.menu_name).toBe('Dashboard');
      expect(link.routerlink).toBe('/dashboard');
    });

    it('should have default icon value', () => {
      const link = new SubLink('Home', '/home');
      expect(link.icon).toBe('clipboard-text-multiple-outline');
    });

    it('should set icon when provided', () => {
      const link = new SubLink('Home', '/home', 'home-outline');
      expect(link.icon).toBe('home-outline');
    });

    it('should have default menu_header as empty string', () => {
      const link = new SubLink('Home', '/home');
      expect(link.menu_header).toBe('');
    });

    it('should set menu_header when provided', () => {
      const link = new SubLink('Home', '/home', 'home-outline', 'Navigation');
      expect(link.menu_header).toBe('Navigation');
    });

    it('should have default id as NaN', () => {
      const link = new SubLink('Home', '/home');
      expect(link.id).toBeNaN();
    });

    it('should have default order as -1', () => {
      const link = new SubLink('Home', '/home');
      expect(link.order).toBe(-1);
    });

    it('should have default menu_name_active_item as empty string', () => {
      const link = new SubLink('Home', '/home');
      expect(link.menu_name_active_item).toBe('');
    });
  });

  describe('Link', () => {
    it('should create with no parameters', () => {
      const link = new Link();
      expect(link.menu_name).toBe('');
      expect(link.routerlink).toBe('');
    });

    it('should create with required parameters', () => {
      const link = new Link('Admin', '/admin');
      expect(link.menu_name).toBe('Admin');
      expect(link.routerlink).toBe('/admin');
    });

    it('should have default icon value', () => {
      const link = new Link('Admin', '/admin');
      expect(link.icon).toBe('clipboard-text-multiple-outline');
    });

    it('should set icon when provided', () => {
      const link = new Link('Admin', '/admin', 'shield-outline');
      expect(link.icon).toBe('shield-outline');
    });

    it('should have empty menu_items by default', () => {
      const link = new Link('Admin', '/admin');
      expect(link.menu_items).toEqual([]);
    });

    it('should set menu_items when provided', () => {
      const subLink = new SubLink('Sub', '/sub');
      const link = new Link('Admin', '/admin', 'shield', [subLink]);
      expect(link.menu_items.length).toBe(1);
      expect(link.menu_items[0]).toBe(subLink);
    });

    it('should have default menu_header as empty string', () => {
      const link = new Link('Admin', '/admin');
      expect(link.menu_header).toBe('');
    });

    it('should set menu_header when provided', () => {
      const link = new Link('Admin', '/admin', 'icon', [], 'Header');
      expect(link.menu_header).toBe('Header');
    });

    it('should have default id as NaN', () => {
      const link = new Link('Admin', '/admin');
      expect(link.id).toBeNaN();
    });

    it('should have default order as -1', () => {
      const link = new Link('Admin', '/admin');
      expect(link.order).toBe(-1);
    });

    it('should have default menu_name_active_item as empty string', () => {
      const link = new Link('Admin', '/admin');
      expect(link.menu_name_active_item).toBe('');
    });

    it('should allow setting permission to null', () => {
      const link = new Link('Admin', '/admin');
      link.permission = null;
      expect(link.permission).toBeNull();
    });

    it('should allow setting permission to an AuthPermission', () => {
      const link = new Link('Admin', '/admin');
      const perm = new AuthPermission();
      perm.codename = 'can_view_admin';
      link.permission = perm;
      expect(link.permission).toBe(perm);
    });
  });
});
