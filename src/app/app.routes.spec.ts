import { routes } from './app.routes';
import { Routes } from '@angular/router';

describe('app.routes', () => {
  it('should export a routes array', () => {
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBe(true);
  });

  it('should have at least one route defined', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  describe('Public routes', () => {
    it('should have a home route', () => {
      const home = routes.find(r => r.path === '');
      expect(home).toBeDefined();
      expect(home?.title).toBe('Home');
    });

    it('should have a login route', () => {
      const login = routes.find(r => r.path === 'login');
      expect(login).toBeDefined();
      expect(login?.title).toBe('Login');
    });

    it('should have a contact route', () => {
      const contact = routes.find(r => r.path === 'contact');
      expect(contact).toBeDefined();
      expect(contact?.title).toBe('Contact Us');
    });

    it('should have a calendar route', () => {
      const calendar = routes.find(r => r.path === 'calendar');
      expect(calendar).toBeDefined();
      expect(calendar?.title).toBe('Calendar');
    });

    it('should have an about route', () => {
      const about = routes.find(r => r.path === 'about');
      expect(about).toBeDefined();
      expect(about?.title).toBe('About Us');
    });

    it('should have a media route', () => {
      const media = routes.find(r => r.path === 'media');
      expect(media).toBeDefined();
      expect(media?.title).toBe('Media');
    });

    it('should have a resources route', () => {
      const resources = routes.find(r => r.path === 'resources');
      expect(resources).toBeDefined();
      expect(resources?.title).toBe('Resources');
    });

    it('should have a FIRST route', () => {
      const first = routes.find(r => r.path === 'first');
      expect(first).toBeDefined();
      expect(first?.title).toBe('FIRST');
    });

    it('should have a sponsor route', () => {
      const sponsor = routes.find(r => r.path === 'sponsor');
      expect(sponsor).toBeDefined();
      expect(sponsor?.title).toBe('Sponsor');
    });

    it('should have a competition route', () => {
      const comp = routes.find(r => r.path === 'competition');
      expect(comp).toBeDefined();
      expect(comp?.title).toBe('Competition');
    });
  });

  describe('Join (recruitment) routes', () => {
    it('should have join/impact route', () => {
      const route = routes.find(r => r.path === 'join/impact');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Join Impact');
    });

    it('should have join/software route', () => {
      const route = routes.find(r => r.path === 'join/software');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Join Software');
    });

    it('should have join/mechanical route', () => {
      const route = routes.find(r => r.path === 'join/mechanical');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Join Mechanical');
    });

    it('should have join/electrical route', () => {
      const route = routes.find(r => r.path === 'join/electrical');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Join Electrical');
    });

    it('should have join/team-application route', () => {
      const route = routes.find(r => r.path === 'join/team-application');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Team Application');
    });
  });

  describe('Media routes', () => {
    it('should have media/build-season route', () => {
      const route = routes.find(r => r.path === 'media/build-season');
      expect(route).toBeDefined();
      expect(route?.title).toBe('Media Build Season');
    });

    it('should have media/community-outreach route', () => {
      const route = routes.find(r => r.path === 'media/community-outreach');
      expect(route).toBeDefined();
    });

    it('should have media/competition route', () => {
      const route = routes.find(r => r.path === 'media/competition');
      expect(route).toBeDefined();
    });

    it('should have media/wallpapers route', () => {
      const route = routes.find(r => r.path === 'media/wallpapers');
      expect(route).toBeDefined();
    });
  });

  describe('Protected (authenticated) routes', () => {
    it('should have a scouting parent route with canActivate', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      expect(scouting).toBeDefined();
      expect(scouting?.canActivate).toBeDefined();
      expect(Array.isArray(scouting?.canActivate)).toBe(true);
      expect((scouting?.canActivate as any[]).length).toBeGreaterThan(0);
    });

    it('should have scouting children routes', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      expect(scouting?.children).toBeDefined();
      expect((scouting?.children as Routes).length).toBeGreaterThan(0);
    });

    it('should have scouting field route as child', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      const field = (scouting?.children as Routes)?.find(r => r.path === 'field');
      expect(field).toBeDefined();
      expect(field?.title).toBe('Field Scouting');
      expect(field?.loadComponent).toBeDefined();
    });

    it('should have scouting pit route as child', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      const pit = (scouting?.children as Routes)?.find(r => r.path === 'pit');
      expect(pit).toBeDefined();
      expect(pit?.title).toBe('Pit Scouting');
    });

    it('should have scouting portal route as child', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      const portal = (scouting?.children as Routes)?.find(r => r.path === 'portal');
      expect(portal).toBeDefined();
    });

    it('should have scouting admin routes', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      const adminUsers = (scouting?.children as Routes)?.find(r => r.path === 'admin/users');
      expect(adminUsers).toBeDefined();
      expect(adminUsers?.title).toBe('Scout Admin Users');
    });

    it('should have admin parent route with canActivate', () => {
      const admin = routes.find(r => r.path === 'admin');
      expect(admin).toBeDefined();
      expect(admin?.canActivate).toBeDefined();
      expect(Array.isArray(admin?.canActivate)).toBe(true);
    });

    it('should have admin children routes', () => {
      const admin = routes.find(r => r.path === 'admin');
      expect(admin?.children).toBeDefined();
      expect((admin?.children as Routes).length).toBeGreaterThan(0);
    });

    it('should have admin users child route', () => {
      const admin = routes.find(r => r.path === 'admin');
      const users = (admin?.children as Routes)?.find(r => r.path === 'users');
      expect(users).toBeDefined();
      expect(users?.title).toBe('Admin Users');
    });

    it('should have admin meetings child route', () => {
      const admin = routes.find(r => r.path === 'admin');
      const meetings = (admin?.children as Routes)?.find(r => r.path === 'meetings');
      expect(meetings).toBeDefined();
    });

    it('should have user profile route with canActivate', () => {
      const profile = routes.find(r => r.path === 'user/profile');
      expect(profile).toBeDefined();
      expect(profile?.canActivate).toBeDefined();
    });

    it('should have user profile with id parameter', () => {
      const profileWithId = routes.find(r => r.path === 'user/profile/:id');
      expect(profileWithId).toBeDefined();
    });

    it('should have attendance route with canActivate', () => {
      const attendance = routes.find(r => r.path === 'attendance');
      expect(attendance).toBeDefined();
      expect(attendance?.canActivate).toBeDefined();
    });
  });

  describe('Wildcard route', () => {
    it('should have a wildcard route redirecting to home', () => {
      const wildcard = routes.find(r => r.path === '**');
      expect(wildcard).toBeDefined();
      expect(wildcard?.redirectTo).toBe('');
    });
  });

  describe('Lazy loading', () => {
    it('should have scouting field route use lazy loading', () => {
      const scouting = routes.find(r => r.path === 'scouting');
      const field = (scouting?.children as Routes)?.find(r => r.path === 'field');
      expect(typeof field?.loadComponent).toBe('function');
    });

    it('should have admin users route use lazy loading', () => {
      const admin = routes.find(r => r.path === 'admin');
      const users = (admin?.children as Routes)?.find(r => r.path === 'users');
      expect(typeof users?.loadComponent).toBe('function');
    });
  });
});
