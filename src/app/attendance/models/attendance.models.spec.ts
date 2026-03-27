import {
  MeetingType,
  Meeting,
  Attendance,
  AttendanceReport,
  MeetingHours,
  AttendanceApprovalType,
} from './attendance.models';
import { User } from '@app/auth/models/user.models';

describe('attendance.models', () => {
  describe('MeetingType', () => {
    it('should create with default values', () => {
      const mt = new MeetingType();
      expect(mt.meeting_typ).toBe('reg');
      expect(mt.meeting_nm).toBe('Regular');
    });
  });

  describe('Meeting', () => {
    it('should create with default values', () => {
      const m = new Meeting();
      expect(m.id).toBeNaN();
      expect(m.ended).toBe(false);
      expect(m.title).toBe('');
      expect(m.description).toBe('');
      expect(m.private_ind).toBe(false);
      expect(m.void_ind).toBe('n');
    });

    it('should create meeting_typ as MeetingType instance', () => {
      const m = new Meeting();
      expect(m.meeting_typ).toBeInstanceOf(MeetingType);
    });

    it('should have start as a Date', () => {
      const m = new Meeting();
      expect(m.start).toBeInstanceOf(Date);
    });

    it('should have end as a Date', () => {
      const m = new Meeting();
      expect(m.end).toBeInstanceOf(Date);
    });

    it('should have end 1 hour after start by default', () => {
      const m = new Meeting();
      const diff = m.end.getTime() - m.start.getTime();
      expect(diff).toBeCloseTo(3600000, -3); // within 1 second of 1 hour
    });
  });

  describe('AttendanceApprovalType', () => {
    it('should create with default values', () => {
      const aat = new AttendanceApprovalType();
      expect(aat.approval_typ).toBe('unapp');
      expect(aat.approval_nm).toBe('Unapproved');
    });
  });

  describe('Attendance', () => {
    it('should create with default values', () => {
      const a = new Attendance();
      expect(a.id).toBeNaN();
      expect(a.absent).toBe(false);
      expect(a.void_ind).toBe('n');
      expect(a.user).toBeUndefined();
      expect(a.meeting).toBeUndefined();
      expect(a.time_out).toBeUndefined();
    });

    it('should have time_in as a Date', () => {
      const a = new Attendance();
      expect(a.time_in).toBeInstanceOf(Date);
    });

    it('should have approval_typ as AttendanceApprovalType', () => {
      const a = new Attendance();
      expect(a.approval_typ).toBeInstanceOf(AttendanceApprovalType);
    });

    it('should allow setting user', () => {
      const a = new Attendance();
      const user = new User();
      user.username = 'testuser';
      a.user = user;
      expect(a.user).toBe(user);
      expect(a.user!.username).toBe('testuser');
    });

    it('should allow setting meeting', () => {
      const a = new Attendance();
      const meeting = new Meeting();
      meeting.title = 'Team Meeting';
      a.meeting = meeting;
      expect(a.meeting).toBe(meeting);
    });
  });

  describe('AttendanceReport', () => {
    it('should create with default values', () => {
      const ar = new AttendanceReport();
      expect(ar.req_reg_time).toBeNaN();
      expect(ar.reg_time).toBeNaN();
      expect(ar.reg_time_percentage).toBeNaN();
      expect(ar.event_time).toBeNaN();
      expect(ar.event_time_percentage).toBeNaN();
    });

    it('should have user as a User instance', () => {
      const ar = new AttendanceReport();
      expect(ar.user).toBeInstanceOf(User);
    });
  });

  describe('MeetingHours', () => {
    it('should create with default values', () => {
      const mh = new MeetingHours();
      expect(mh.hours).toBeNaN();
      expect(mh.hours_future).toBeNaN();
      expect(mh.bonus_hours).toBeNaN();
      expect(mh.event_hours).toBeNaN();
    });
  });
});
