import express from 'express';

import rubricList from '../responses/rubricList.json';
import rubric from '../responses/rubric.json';

export const rubricRouter = express.Router();

rubricRouter.get('/main/all_rubrics', (_, res) => {
  res.json(rubricList);
});

rubricRouter.get('/main/get_ideas_by_rubric', (_, res) => {
  res.json(rubric);
});
