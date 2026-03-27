import {
  ConditionalOnQuestion,
  Question,
  QuestionOption,
  FlowAnswer,
  Answer,
  QuestionType,
  FormSubType,
  QuestionAggregateType,
  QuestionAggregateQuestion,
  QuestionAggregate,
  QuestionConditionType,
  QuestionCondition,
  FlowCondition,
  FormType,
  Response,
  FlowQuestion,
  Flow,
  FormInitialization,
  GraphType,
  GraphBin,
  GraphCategoryAttribute,
  GraphCategory,
  GraphQuestionType,
  GraphQuestion,
  Graph,
  HistogramBin,
  Histogram,
  PlotPoint,
  Plot,
  BoxAndWhiskerPlot,
  TouchMapPoint,
  TouchMap,
} from './form.models';

describe('form.models', () => {
  describe('ConditionalOnQuestion', () => {
    it('should create with default values', () => {
      const cq = new ConditionalOnQuestion();
      expect(cq.conditional_on).toBeNaN();
      expect(cq.condition_value).toBe('');
      expect(cq.question_condition_typ).toBeInstanceOf(QuestionConditionType);
    });
  });

  describe('Question', () => {
    it('should create with default values', () => {
      const q = new Question();
      expect(q.id).toBeNaN();
      expect(q.flow_id_set).toEqual([]);
      expect(q.required).toBe('n');
      expect(q.active).toBe('y');
      expect(q.void_ind).toBe('n');
      expect(q.answer).toBe('');
      expect(q.short_display_value).toBe('');
      expect(q.display_value).toBe('');
      expect(q.icon).toBe('');
      expect(q.icon_only).toBe(false);
      expect(q.value_multiplier).toBe(1);
      expect(q.questionoption_set).toEqual([]);
      expect(q.conditional_on_questions).toEqual([]);
      expect(q.conditional_question_id_set).toEqual([]);
    });

    it('should have table_col_width default of 100px', () => {
      const q = new Question();
      expect(q.table_col_width).toBe('100px');
    });

    it('should have form_typ as FormType instance', () => {
      const q = new Question();
      expect(q.form_typ).toBeInstanceOf(FormType);
    });
  });

  describe('QuestionOption', () => {
    it('should create with default active and void values', () => {
      const opt = new QuestionOption();
      expect(opt.active).toBe('y');
      expect(opt.void_ind).toBe('n');
    });
  });

  describe('FlowAnswer', () => {
    it('should create with question and answer', () => {
      const q = new Question();
      const fa = new FlowAnswer(q, 'my answer');
      expect(fa.question).toBe(q);
      expect(fa.value).toBe('my answer');
      expect(fa.id).toBeNaN();
      expect(fa.void_ind).toBe('n');
    });

    it('should set value_time on creation', () => {
      const q = new Question();
      const fa = new FlowAnswer(q, 'test');
      expect(fa.value_time).toBeTruthy();
      expect(typeof fa.value_time).toBe('string');
    });
  });

  describe('Answer', () => {
    it('should create with answer string', () => {
      const a = new Answer('42');
      expect(a.value).toBe('42');
      expect(a.void_ind).toBe('n');
      expect(a.flow_answers).toEqual([]);
    });

    it('should create with question', () => {
      const q = new Question();
      const a = new Answer('42', q);
      expect(a.question).toBe(q);
    });

    it('should create with question and flow', () => {
      const q = new Question();
      const f = new Flow();
      const a = new Answer('42', q, f);
      expect(a.question).toBe(q);
      expect(a.flow).toBe(f);
    });

    it('should have response as Response instance', () => {
      const a = new Answer('42');
      expect(a.response).toBeInstanceOf(Response);
    });
  });

  describe('QuestionType', () => {
    it('should create with default values', () => {
      const qt = new QuestionType();
      expect(qt.is_list).toBe('n');
      expect(qt.void_ind).toBe('n');
    });
  });

  describe('FormSubType', () => {
    it('should create with default values', () => {
      const fst = new FormSubType();
      expect(fst.form_sub_typ).toBe('');
      expect(fst.form_sub_nm).toBe('');
      expect(fst.form_typ_id).toBe('');
      expect(fst.order).toBeNaN();
    });
  });

  describe('QuestionAggregateType', () => {
    it('should create with default values', () => {
      const qat = new QuestionAggregateType();
      expect(qat.question_aggregate_typ).toBe('');
      expect(qat.question_aggregate_nm).toBe('');
    });
  });

  describe('QuestionAggregateQuestion', () => {
    it('should create with default values', () => {
      const qaq = new QuestionAggregateQuestion();
      expect(qaq.id).toBeNaN();
      expect(qaq.order).toBeNaN();
      expect(qaq.active).toBe('y');
      expect(qaq.question_condition_typ).toBeUndefined();
      expect(qaq.question).toBeUndefined();
    });
  });

  describe('QuestionAggregate', () => {
    it('should create with default values', () => {
      const qa = new QuestionAggregate();
      expect(qa.name).toBe('');
      expect(qa.horizontal).toBe(true);
      expect(qa.use_answer_time).toBe(false);
      expect(qa.aggregate_questions).toEqual([]);
      expect(qa.active).toBe('y');
    });
  });

  describe('QuestionConditionType', () => {
    it('should create with default values', () => {
      const qct = new QuestionConditionType();
      expect(qct.question_condition_typ).toBe('');
      expect(qct.question_condition_nm).toBe('');
    });
  });

  describe('QuestionCondition', () => {
    it('should create with default values', () => {
      const qc = new QuestionCondition();
      expect(qc.value).toBe('');
      expect(qc.active).toBe('y');
      expect(qc.question_condition_typ).toBeUndefined();
    });
  });

  describe('FlowCondition', () => {
    it('should create with default values', () => {
      const fc = new FlowCondition();
      expect(fc.id).toBeNaN();
      expect(fc.active).toBe('y');
      expect(fc.flow_from).toBeInstanceOf(Flow);
      expect(fc.flow_to).toBeInstanceOf(Flow);
    });
  });

  describe('FormType', () => {
    it('should create with default values', () => {
      const ft = new FormType();
      expect(ft.form_typ).toBe('');
      expect(ft.form_nm).toBe('');
    });
  });

  describe('Response', () => {
    it('should create with default values', () => {
      const r = new Response();
      expect(r.id).toBeNaN();
      expect(r.form_typ).toBe('');
      expect(r.archive_ind).toBe('n');
      expect(r.questionanswer_set).toEqual([]);
      expect(r.time).toBeInstanceOf(Date);
    });
  });

  describe('FlowQuestion', () => {
    it('should create with default values', () => {
      const fq = new FlowQuestion();
      expect(fq.id).toBeNaN();
      expect(fq.flow_id).toBeNaN();
      expect(fq.press_to_continue).toBe(false);
      expect(fq.order).toBeNaN();
      expect(fq.active).toBe('');
      expect(fq.question).toBeInstanceOf(Question);
    });
  });

  describe('Flow', () => {
    it('should create with default values', () => {
      const f = new Flow();
      expect(f.id).toBeNaN();
      expect(f.name).toBe('');
      expect(f.single_run).toBe(false);
      expect(f.void_ind).toBe('n');
      expect(f.has_conditions).toBe('');
      expect(f.flow_questions).toEqual([]);
      expect(f.question_answer).toBeUndefined();
      expect(f.form_typ).toBeInstanceOf(FormType);
    });
  });

  describe('FormInitialization', () => {
    it('should create with empty arrays', () => {
      const fi = new FormInitialization();
      expect(fi.question_types).toEqual([]);
      expect(fi.questions).toEqual([]);
      expect(fi.form_sub_types).toEqual([]);
      expect(fi.flows).toEqual([]);
    });
  });

  describe('GraphType', () => {
    it('should create with default values', () => {
      const gt = new GraphType();
      expect(gt.graph_typ).toBe('');
      expect(gt.graph_nm).toBe('');
      expect(gt.requires_bins).toBe(false);
      expect(gt.requires_categories).toBe(false);
      expect(gt.requires_graph_question_typs).toEqual([]);
    });
  });

  describe('GraphBin', () => {
    it('should create with default values', () => {
      const gb = new GraphBin();
      expect(gb.id).toBeNaN();
      expect(gb.graph_id).toBeNaN();
      expect(gb.bin).toBeNaN();
      expect(gb.width).toBeNaN();
      expect(gb.active).toBe('y');
    });
  });

  describe('GraphCategoryAttribute', () => {
    it('should create with default values', () => {
      const gca = new GraphCategoryAttribute();
      expect(gca.id).toBeNaN();
      expect(gca.graph_category_id).toBeNaN();
      expect(gca.value).toBe('');
      expect(gca.active).toBe('y');
      expect(gca.question).toBeUndefined();
      expect(gca.question_aggregate).toBeUndefined();
      expect(gca.question_condition_typ).toBeUndefined();
    });
  });

  describe('GraphCategory', () => {
    it('should create with default values', () => {
      const gc = new GraphCategory();
      expect(gc.id).toBeNaN();
      expect(gc.graph_id).toBeNaN();
      expect(gc.category).toBe('');
      expect(gc.order).toBeNaN();
      expect(gc.active).toBe('y');
      expect(gc.graphcategoryattribute_set).toEqual([]);
    });
  });

  describe('GraphQuestionType', () => {
    it('should create with default values', () => {
      const gqt = new GraphQuestionType();
      expect(gqt.graph_question_typ).toBe('');
      expect(gqt.graph_question_nm).toBe('');
    });
  });

  describe('GraphQuestion', () => {
    it('should create with default values', () => {
      const gq = new GraphQuestion();
      expect(gq.id).toBeNaN();
      expect(gq.graph_id).toBeNaN();
      expect(gq.active).toBe('y');
      expect(gq.question).toBeUndefined();
      expect(gq.question_aggregate).toBeUndefined();
      expect(gq.graph_question_typ).toBeUndefined();
    });
  });

  describe('Graph', () => {
    it('should create with default values', () => {
      const g = new Graph();
      expect(g.id).toBeNaN();
      expect(g.name).toBe('');
      expect(g.active).toBe('y');
      expect(g.graph_typ).toBeUndefined();
      expect(g.graphbin_set).toEqual([]);
      expect(g.graphcategory_set).toEqual([]);
      expect(g.graphquestion_set).toEqual([]);
    });
  });

  describe('HistogramBin', () => {
    it('should create with default values', () => {
      const hb = new HistogramBin();
      expect(hb.bin).toBe('');
      expect(hb.count).toBeNaN();
    });
  });

  describe('Histogram', () => {
    it('should create with default values', () => {
      const h = new Histogram();
      expect(h.label).toBe('');
      expect(h.bins).toEqual([]);
    });
  });

  describe('PlotPoint', () => {
    it('should create with default values', () => {
      const pp = new PlotPoint();
      expect(pp.point).toBeNaN();
      expect(pp.time).toBeInstanceOf(Date);
    });
  });

  describe('Plot', () => {
    it('should create with default values', () => {
      const p = new Plot();
      expect(p.label).toBe('');
      expect(p.points).toEqual([]);
    });
  });

  describe('BoxAndWhiskerPlot', () => {
    it('should create with default values', () => {
      const bwp = new BoxAndWhiskerPlot();
      expect(bwp.label).toBe('');
      expect(bwp.q1).toBeNaN();
      expect(bwp.q2).toBeNaN();
      expect(bwp.q3).toBeNaN();
      expect(bwp.min).toBeNaN();
      expect(bwp.max).toBeNaN();
      expect(bwp.outliers).toEqual([]);
    });
  });

  describe('TouchMapPoint', () => {
    it('should create with default values', () => {
      const tmp = new TouchMapPoint();
      expect(tmp.x).toBeNaN();
      expect(tmp.y).toBeNaN();
    });
  });

  describe('TouchMap', () => {
    it('should create with default values', () => {
      const tm = new TouchMap();
      expect(tm.label).toBe('');
      expect(tm.question).toBeInstanceOf(Question);
      expect(tm.points).toEqual([]);
    });
  });
});
