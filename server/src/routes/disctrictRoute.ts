import express from 'express';

import data from '../responses/disctrictList.json';

export const districtRouter = express.Router();

districtRouter.get('/main/get_districts', (_, res) => {
  return res.json(data);
});
