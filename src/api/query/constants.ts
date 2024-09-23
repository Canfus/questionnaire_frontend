export const STALE_TIME = 5 * 60 * 1000;

export const queryKeys = {
  slideList: ['slide_list'],
  rubricList: ['rubric_list'],
  rubricById: (id: number | string) => ['rubric', id],
  ideaById: (id: number | string) => ['idea', id],
  districtList: ['district_list'],
  techQuiz: ['tech_quiz_list'],
  envQuiz: ['env_quiz_list'],
};
