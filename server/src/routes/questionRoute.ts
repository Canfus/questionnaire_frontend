import express from 'express';

import data from '../responses/questionList.json';

export const questionRoute = express.Router();

questionRoute.get('/main/get_questions', (_, res) => {
  return res.json(data);
});
