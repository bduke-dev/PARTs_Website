import {
  Season,
  Team,
  Event,
  CompetitionLevel,
  Match,
  ScoutFieldSchedule,
  ScoutQuestion,
  ScoutFieldFormResponse,
  ScoutPitFormResponse,
  ScoutFieldResponsesReturn,
  Col,
  ScoutField,
  ScoutPitResponseAnswer,
  ScoutPitImageType,
  ScoutPitImage,
  ScoutPitResponse,
  ScoutPitResponsesReturn,
  Schedule,
  ScheduleType,
  ScheduleByType,
  TeamNote,
  MatchTeamData,
  AllScoutInfo,
  ScoutPitSchedule,
  EventToTeams,
  ScoutFieldResultsSerializer,
  UserInfo,
  FieldForm,
  FormSubTypeForm,
  FieldFormForm,
  MatchStrategy,
  AllianceSelection,
  FieldResponse,
  DashboardGraph,
  DashboardViewType,
  DashboardView,
  Dashboard,
} from './scouting.models';
import { User } from '@app/auth/models/user.models';
import { Answer } from '@app/core/models/form.models';

describe('scouting.models', () => {
  describe('Season', () => {
    it('should create with default values', () => {
      const s = new Season();
      expect(s.id).toBeNaN();
      expect(s.season).toBe('');
      expect(s.current).toBe('n');
      expect(s.game).toBe('');
      expect(s.manual).toBe('');
    });
  });

  describe('Team', () => {
    it('should create with default values', () => {
      const t = new Team();
      expect(t.team_no).toBeNaN();
      expect(t.team_nm).toBe('');
      expect(t.void_ind).toBe('n');
      expect(t.checked).toBe(false);
      expect(t.pit_result).toBe(0);
      expect(t.pit_image).toBe(0);
      expect(t.rank).toBeNaN();
    });

    it('should create with team_no parameter', () => {
      const t = new Team(1234);
      expect(t.team_no).toBe(1234);
    });
  });

  describe('Event', () => {
    it('should create with default values', () => {
      const e = new Event();
      expect(e.id).toBeNaN();
      expect(e.season_id).toBeNaN();
      expect(e.event_nm).toBe('');
      expect(e.event_cd).toBe('');
      expect(e.current).toBe('n');
      expect(e.timezone).toBe('America/New_York');
      expect(e.void_ind).toBe('n');
      expect(e.competition_page_active).toBe('n');
      expect(e.teams).toEqual([]);
    });
  });

  describe('CompetitionLevel', () => {
    it('should create with default values', () => {
      const cl = new CompetitionLevel();
      expect(cl.comp_lvl_typ).toBe('');
      expect(cl.comp_lvl_typ_nm).toBe('');
      expect(cl.comp_lvl_order).toBe(0);
      expect(cl.void_ind).toBe('');
    });

    it('should create with provided values', () => {
      const cl = new CompetitionLevel('qm', 'Qualification');
      expect(cl.comp_lvl_typ).toBe('qm');
      expect(cl.comp_lvl_typ_nm).toBe('Qualification');
    });
  });

  describe('Match', () => {
    it('should create with default values', () => {
      const m = new Match();
      expect(m.match_key).toBe('');
      expect(m.match_number).toBeNaN();
      expect(m.red_one_id).toBeNaN();
      expect(m.red_two_id).toBeNaN();
      expect(m.red_three_id).toBeNaN();
      expect(m.blue_one_id).toBeNaN();
      expect(m.blue_two_id).toBeNaN();
      expect(m.blue_three_id).toBeNaN();
    });
  });

  describe('ScoutFieldSchedule', () => {
    it('should create with default values', () => {
      const sfs = new ScoutFieldSchedule();
      expect(sfs.id).toBeNaN();
      expect(sfs.event_id).toBeNaN();
      expect(sfs.void_ind).toBe('n');
      expect(sfs.scouts).toBe('');
      expect(sfs.notification1).toBe(false);
      expect(sfs.notification2).toBe(false);
      expect(sfs.notification3).toBe(false);
      expect(sfs.red_leader).toBeUndefined();
      expect(sfs.blue_leader).toBeUndefined();
    });

    it('should have User instances as defaults for alliance spots', () => {
      const sfs = new ScoutFieldSchedule();
      expect(sfs.red_one_id).toBeInstanceOf(User);
      expect(sfs.red_two_id).toBeInstanceOf(User);
      expect(sfs.red_three_id).toBeInstanceOf(User);
      expect(sfs.blue_one_id).toBeInstanceOf(User);
      expect(sfs.blue_two_id).toBeInstanceOf(User);
      expect(sfs.blue_three_id).toBeInstanceOf(User);
    });

    it('should have Date instances for check-in times', () => {
      const sfs = new ScoutFieldSchedule();
      expect(sfs.red_one_check_in).toBeInstanceOf(Date);
      expect(sfs.red_two_check_in).toBeInstanceOf(Date);
      expect(sfs.red_three_check_in).toBeInstanceOf(Date);
      expect(sfs.blue_one_check_in).toBeInstanceOf(Date);
      expect(sfs.blue_two_check_in).toBeInstanceOf(Date);
      expect(sfs.blue_three_check_in).toBeInstanceOf(Date);
    });
  });

  describe('ScoutQuestion', () => {
    it('should create with default void_ind', () => {
      const sq = new ScoutQuestion();
      expect(sq.void_ind).toBe('n');
    });
  });

  describe('ScoutFieldFormResponse', () => {
    it('should create with default values', () => {
      const r = new ScoutFieldFormResponse();
      expect(r.team_id).toBeNaN();
      expect(r.match).toBeUndefined();
      expect(r.form_typ).toBe('field');
      expect(r.answers).toEqual([]);
    });

    it('should create with team parameter', () => {
      const r = new ScoutFieldFormResponse(1234);
      expect(r.team_id).toBe(1234);
    });

    it('should create with team and match parameters', () => {
      const m = new Match();
      const r = new ScoutFieldFormResponse(1234, m);
      expect(r.team_id).toBe(1234);
      expect(r.match).toBe(m);
    });

    it('should create with answers', () => {
      const a = new Answer('test');
      const r = new ScoutFieldFormResponse(1234, undefined, [a]);
      expect(r.answers.length).toBe(1);
    });
  });

  describe('ScoutPitFormResponse', () => {
    it('should create with default values', () => {
      const r = new ScoutPitFormResponse();
      expect(r.answers).toEqual([]);
      expect(r.team_id).toBeNaN();
      expect(r.response_id).toBeNaN();
      expect(r.form_typ).toBe('field');
      expect(r.pics).toEqual([]);
    });

    it('should create with answers and team', () => {
      const a = new Answer('test');
      const r = new ScoutPitFormResponse([a], 2345);
      expect(r.answers.length).toBe(1);
      expect(r.team_id).toBe(2345);
    });
  });

  describe('ScoutFieldResponsesReturn', () => {
    it('should create with default values', () => {
      const r = new ScoutFieldResponsesReturn();
      expect(r.count).toBeNaN();
      expect(r.previous).toBeNaN();
      expect(r.next).toBeNaN();
      expect(r.scoutAnswers).toEqual([]);
      expect(r.removed_responses).toEqual([]);
      expect(r.current_season).toBeInstanceOf(Season);
      expect(r.current_event).toBeInstanceOf(Event);
    });
  });

  describe('Col', () => {
    it('should create with default values', () => {
      const c = new Col();
      expect(c.PropertyName).toBe('');
      expect(c.ColLabel).toBe('');
      expect(c.Width).toBe('');
      expect(c.order).toBe('');
    });
  });

  describe('ScoutField', () => {
    it('should create with default values', () => {
      const sf = new ScoutField();
      expect(sf.id).toBeNaN();
      expect(sf.response).toBe('');
      expect(sf.event).toBeNaN();
      expect(sf.team_no).toBeNaN();
      expect(sf.user).toBeNaN();
      expect(sf.match).toBeNaN();
      expect(sf.void_ind).toBe('n');
      expect(sf.time).toBeUndefined();
    });
  });

  describe('ScoutPitResponseAnswer', () => {
    it('should create with default values', () => {
      const a = new ScoutPitResponseAnswer();
      expect(a.question).toBe('');
      expect(a.answer).toBe('');
    });
  });

  describe('ScoutPitImageType', () => {
    it('should create with default values', () => {
      const t = new ScoutPitImageType();
      expect(t.pit_image_typ).toBe('');
      expect(t.pit_image_nm).toBe('');
    });
  });

  describe('ScoutPitImage', () => {
    it('should create with default values', () => {
      const img = new ScoutPitImage();
      expect(img.id).toBeNaN();
      expect(img.img).toBeUndefined();
      expect(img.img_url).toBe('');
      expect(img.img_title).toBe('');
      expect(img.default).toBe(false);
      expect(img.pit_image_typ.pit_image_typ).toBe('');
      expect(img.pit_image_typ.pit_image_nm).toBe('');
    });

    it('should create with url and title', () => {
      const img = new ScoutPitImage('https://example.com/img.jpg', 'Front View', 'front');
      expect(img.img_url).toBe('https://example.com/img.jpg');
      expect(img.img_title).toBe('Front View');
      expect(img.pit_image_typ.pit_image_typ).toBe('front');
    });

    it('should create with default parameter', () => {
      const img = new ScoutPitImage('url', 'title', 'typ', undefined, true);
      expect(img.default).toBe(true);
    });
  });

  describe('ScoutPitResponse', () => {
    it('should create with default values', () => {
      const r = new ScoutPitResponse();
      expect(r.id).toBeNaN();
      expect(r.team_no).toBeNaN();
      expect(r.team_nm).toBe('');
      expect(r.pics).toEqual([]);
      expect(r.responses).toEqual([]);
    });
  });

  describe('ScoutPitResponsesReturn', () => {
    it('should create with default values', () => {
      const r = new ScoutPitResponsesReturn();
      expect(r.current_season).toBeInstanceOf(Season);
      expect(r.current_event).toBeInstanceOf(Event);
      expect(r.teams).toEqual([]);
    });
  });

  describe('Schedule', () => {
    it('should create with default values', () => {
      const s = new Schedule();
      expect(s.id).toBeNaN();
      expect(s.sch_typ).toBe('');
      expect(s.sch_nm).toBe('');
      expect(s.user_name).toBe('');
      expect(s.notified).toBe(false);
      expect(s.void_ind).toBe('n');
      expect(s.user).toBeNull();
    });

    it('should have event_id as Event instance by default', () => {
      const s = new Schedule();
      expect(s.event_id).toBeInstanceOf(Event);
    });
  });

  describe('ScheduleType', () => {
    it('should create with default values', () => {
      const st = new ScheduleType();
      expect(st.sch_typ).toBe('');
      expect(st.sch_nm).toBe('');
    });
  });

  describe('ScheduleByType', () => {
    it('should create with default values', () => {
      const sbt = new ScheduleByType();
      expect(sbt.schedule).toEqual([]);
      expect(sbt.sch_typ).toBeInstanceOf(ScheduleType);
    });
  });

  describe('TeamNote', () => {
    it('should create with default values', () => {
      const tn = new TeamNote();
      expect(tn.id).toBeNaN();
      expect(tn.team_id).toBeNaN();
      expect(tn.note).toBe('');
      expect(tn.void_ind).toBe('n');
      expect(tn.match).toBeUndefined();
      expect(tn.user).toBeUndefined();
    });
  });

  describe('MatchTeamData', () => {
    it('should create with default values', () => {
      const mtd = new MatchTeamData();
      expect(mtd.pitData).toBeUndefined();
      expect(mtd.notes).toEqual([]);
      expect(mtd.alliance).toBe('');
    });
  });

  describe('AllScoutInfo', () => {
    it('should create with empty arrays', () => {
      const asi = new AllScoutInfo();
      expect(asi.seasons).toEqual([]);
      expect(asi.events).toEqual([]);
      expect(asi.teams).toEqual([]);
      expect(asi.matches).toEqual([]);
      expect(asi.schedules).toEqual([]);
      expect(asi.scout_field_schedules).toEqual([]);
      expect(asi.schedule_types).toEqual([]);
      expect(asi.team_notes).toEqual([]);
      expect(asi.match_strategies).toEqual([]);
      expect(asi.alliance_selections).toEqual([]);
    });

    it('should have field_form_form as FieldFormForm instance', () => {
      const asi = new AllScoutInfo();
      expect(asi.field_form_form).toBeInstanceOf(FieldFormForm);
    });
  });

  describe('ScoutPitSchedule', () => {
    it('should create with default values', () => {
      const sps = new ScoutPitSchedule();
      expect(sps.notified).toBe('n');
      expect(sps.void_ind).toBe('n');
      expect(sps.event).toBeInstanceOf(Event);
      expect(sps.user).toBeInstanceOf(User);
    });
  });

  describe('EventToTeams', () => {
    it('should create with empty teams array', () => {
      const ett = new EventToTeams();
      expect(ett.teams).toEqual([]);
    });
  });

  describe('ScoutFieldResultsSerializer', () => {
    it('should create with empty arrays', () => {
      const sfrs = new ScoutFieldResultsSerializer();
      expect(sfrs.scoutCols).toEqual([]);
      expect(sfrs.scoutAnswers).toEqual([]);
    });
  });

  describe('UserInfo', () => {
    it('should create with default values', () => {
      const ui = new UserInfo();
      expect(ui.under_review).toBe(false);
      expect(ui.group_leader).toBe(false);
      expect(ui.eliminate_results).toBe(false);
      expect(ui.user).toBeInstanceOf(User);
    });
  });

  describe('FieldForm', () => {
    it('should create with default values', () => {
      const ff = new FieldForm();
      expect(ff.img_url).toBe('');
      expect(ff.inv_img_url).toBe('');
      expect(ff.full_img_url).toBe('');
    });
  });

  describe('FormSubTypeForm', () => {
    it('should create with default values', () => {
      const fstf = new FormSubTypeForm();
      expect(fstf.questions).toEqual([]);
      expect(fstf.flows).toEqual([]);
    });
  });

  describe('FieldFormForm', () => {
    it('should create with default values', () => {
      const fff = new FieldFormForm();
      expect(fff.id).toBeNaN();
      expect(fff.form_sub_types).toEqual([]);
      expect(fff.field_form).toBeInstanceOf(FieldForm);
    });
  });

  describe('MatchStrategy', () => {
    it('should create with default values', () => {
      const ms = new MatchStrategy();
      expect(ms.strategy).toBe('');
      expect(ms.img_url).toBe('');
      expect(ms.display_value).toBe('');
      expect(ms.match).toBeUndefined();
      expect(ms.user).toBeUndefined();
      expect(ms.img).toBeUndefined();
      expect(ms.time).toBeInstanceOf(Date);
    });
  });

  describe('AllianceSelection', () => {
    it('should create with provided values', () => {
      const e = new Event();
      const t = new Team(1234);
      const as = new AllianceSelection(e, t, 'good team', 1);
      expect(as.event).toBe(e);
      expect(as.team).toBe(t);
      expect(as.note).toBe('good team');
      expect(as.order).toBe(1);
    });

    it('should have default id as NaN', () => {
      const e = new Event();
      const t = new Team(1234);
      const as = new AllianceSelection(e, t, '', NaN);
      expect(as.id).toBeNaN();
    });
  });

  describe('FieldResponse', () => {
    it('should create with default values', () => {
      const fr = new FieldResponse();
      expect(fr.id).toBeNaN();
      expect(fr.match).toBeUndefined();
      expect(fr.display_value).toBe('');
      expect(fr.answers).toEqual([]);
      expect(fr.user).toBeInstanceOf(User);
      expect(fr.time).toBeInstanceOf(Date);
    });
  });

  describe('DashboardGraph', () => {
    it('should create with default values', () => {
      const dg = new DashboardGraph();
      expect(dg.id).toBeNaN();
      expect(dg.graph_id).toBeNaN();
      expect(dg.graph_name).toBe('');
      expect(dg.graph_nm).toBe('');
      expect(dg.graph_typ).toBe('');
      expect(dg.active).toBe('y');
      expect(dg.x_scale_min).toBe(1);
      expect(dg.x_scale_max).toBe(1);
      expect(dg.y_scale_min).toBe(1);
      expect(dg.y_scale_max).toBe(1);
      expect(dg.data).toBeUndefined();
    });

    it('should create with graph_id and order', () => {
      const dg = new DashboardGraph(10, 5);
      expect(dg.graph_id).toBe(10);
      expect(dg.order).toBe(5);
    });
  });

  describe('DashboardViewType', () => {
    it('should create with default values', () => {
      const dvt = new DashboardViewType();
      expect(dvt.dash_view_typ).toBe('');
      expect(dvt.dash_view_nm).toBe('');
    });
  });

  describe('DashboardView', () => {
    it('should create with default values', () => {
      const dv = new DashboardView();
      expect(dv.id).toBeNaN();
      expect(dv.name).toBe('');
      expect(dv.active).toBe('y');
      expect(dv.dashboard_graphs).toEqual([]);
      expect(dv.teams).toEqual([]);
      expect(dv.availableGraphs).toEqual([]);
    });

    it('should create with order parameter', () => {
      const dv = new DashboardView(undefined, 3);
      expect(dv.order).toBe(3);
    });

    it('should create with dash_view_typ parameter', () => {
      const dvt = new DashboardViewType();
      dvt.dash_view_typ = 'team';
      const dv = new DashboardView(dvt, 1);
      expect(dv.dash_view_typ).toBe(dvt);
    });
  });

  describe('Dashboard', () => {
    it('should create with default values', () => {
      const d = new Dashboard();
      expect(d.id).toBeNaN();
      expect(d.active).toBe('y');
      expect(d.dashboard_views).toEqual([]);
      expect(d.default_dash_view_typ).toBeUndefined();
    });
  });
});
