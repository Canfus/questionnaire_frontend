import express from 'express';
import data from '../responses/ideaList.json';

export const ideaRouter = express.Router();

ideaRouter.get('/main/get_idea/:id', (_, res) => {
  setTimeout(() => {
    return res.json(data[0]);
  }, 3000);
});
