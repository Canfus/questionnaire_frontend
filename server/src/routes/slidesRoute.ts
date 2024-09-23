import express from 'express';

import data from '../responses/slides.json';

export const slidesRouter = express.Router();

slidesRouter.get('/slides', (_, res) => res.json(data));
