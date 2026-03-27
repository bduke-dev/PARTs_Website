import { DBStores, LoadedStores } from './idb.store.model';

describe('idb.store.model', () => {
  describe('LoadedStores', () => {
    it('should create with Id of 1', () => {
      const store = new LoadedStores();
      expect(store.Id).toBe(1);
    });

    it('should create with User as a Date', () => {
      const store = new LoadedStores();
      expect(store.User).toBeInstanceOf(Date);
    });
  });

  describe('DBStores', () => {
    it('should have User store with TableName', () => {
      expect(DBStores.User.TableName).toBe('User');
    });

    it('should have User store with Columns string', () => {
      expect(typeof DBStores.User.Columns).toBe('string');
      expect(DBStores.User.Columns.length).toBeGreaterThan(0);
    });

    it('should have UserPermissions store', () => {
      expect(DBStores.UserPermissions.TableName).toBe('UserPermissions');
      expect(typeof DBStores.UserPermissions.Columns).toBe('string');
    });

    it('should have UserLinks store', () => {
      expect(DBStores.UserLinks.TableName).toBe('UserLinks');
      expect(typeof DBStores.UserLinks.Columns).toBe('string');
    });

    it('should have Season store', () => {
      expect(DBStores.Season.TableName).toBe('Season');
      expect(typeof DBStores.Season.Columns).toBe('string');
    });

    it('should have Event store', () => {
      expect(DBStores.Event.TableName).toBe('Event');
      expect(typeof DBStores.Event.Columns).toBe('string');
    });

    it('should have Team store', () => {
      expect(DBStores.Team.TableName).toBe('Team');
      expect(typeof DBStores.Team.Columns).toBe('string');
    });

    it('should have TeamNote store', () => {
      expect(DBStores.TeamNote.TableName).toBe('TeamNote');
      expect(typeof DBStores.TeamNote.Columns).toBe('string');
    });

    it('should have TeamNoteResponse store with ++id columns', () => {
      expect(DBStores.TeamNoteResponse.TableName).toBe('TeamNoteResponse');
      expect(DBStores.TeamNoteResponse.Columns).toBe('++id');
    });

    it('should have Match store', () => {
      expect(DBStores.Match.TableName).toBe('Match');
      expect(typeof DBStores.Match.Columns).toBe('string');
    });

    it('should have MatchStrategy store', () => {
      expect(DBStores.MatchStrategy.TableName).toBe('MatchStrategy');
      expect(typeof DBStores.MatchStrategy.Columns).toBe('string');
    });

    it('should have MatchStrategyResponse store with ++id columns', () => {
      expect(DBStores.MatchStrategyResponse.TableName).toBe('MatchStrategyResponse');
      expect(DBStores.MatchStrategyResponse.Columns).toBe('++id');
    });

    it('should have AllianceSelection store', () => {
      expect(DBStores.AllianceSelection.TableName).toBe('AllianceSelection');
      expect(typeof DBStores.AllianceSelection.Columns).toBe('string');
    });

    it('should have FieldFormForm store', () => {
      expect(DBStores.FieldFormForm.TableName).toBe('FieldFormForm');
      expect(typeof DBStores.FieldFormForm.Columns).toBe('string');
    });

    it('should have ScoutFieldSchedule store', () => {
      expect(DBStores.ScoutFieldSchedule.TableName).toBe('ScoutFieldSchedule');
      expect(typeof DBStores.ScoutFieldSchedule.Columns).toBe('string');
    });

    it('should have ScoutFieldFormResponse store with ++id columns', () => {
      expect(DBStores.ScoutFieldFormResponse.TableName).toBe('ScoutFieldFormResponse');
      expect(DBStores.ScoutFieldFormResponse.Columns).toBe('++id');
    });

    it('should have ScoutFieldResponseColumn store with ++id columns', () => {
      expect(DBStores.ScoutFieldResponseColumn.TableName).toBe('ScoutFieldResponseColumn');
      expect(DBStores.ScoutFieldResponseColumn.Columns).toBe('++id');
    });

    it('should have ScoutFieldResponse store with specific columns', () => {
      expect(DBStores.ScoutFieldResponse.TableName).toBe('ScoutFieldResponse');
      expect(DBStores.ScoutFieldResponse.Columns).toContain('id');
    });

    it('should have ScheduleType store', () => {
      expect(DBStores.ScheduleType.TableName).toBe('ScheduleType');
      expect(typeof DBStores.ScheduleType.Columns).toBe('string');
    });

    it('should have Schedule store', () => {
      expect(DBStores.Schedule.TableName).toBe('Schedule');
      expect(typeof DBStores.Schedule.Columns).toBe('string');
    });

    it('should have ScoutPitFormResponse store with ++id columns', () => {
      expect(DBStores.ScoutPitFormResponse.TableName).toBe('ScoutPitFormResponse');
      expect(DBStores.ScoutPitFormResponse.Columns).toBe('++id');
    });

    it('should have QuestionWithConditions store', () => {
      expect(DBStores.QuestionWithConditions.TableName).toBe('QuestionWithConditions');
      expect(typeof DBStores.QuestionWithConditions.Columns).toBe('string');
    });

    it('should have ScoutPitResponse store', () => {
      expect(DBStores.ScoutPitResponse.TableName).toBe('ScoutPitResponse');
      expect(typeof DBStores.ScoutPitResponse.Columns).toBe('string');
    });

    it('should have LoadedStores store', () => {
      expect(DBStores.LoadedStores.TableName).toBe('LoadedStores');
      expect(typeof DBStores.LoadedStores.Columns).toBe('string');
    });

    it('should have SiteBanner store', () => {
      expect(DBStores.SiteBanner.TableName).toBe('SiteBanner');
      expect(typeof DBStores.SiteBanner.Columns).toBe('string');
    });
  });
});
