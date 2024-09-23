import express from 'express';
import cors from 'cors';

import {
  slidesRouter,
  rubricRouter,
  ideaRouter,
  districtRouter,
  questionRoute,
} from './routes';

const app = express();
const PORT = 5002;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(slidesRouter);
app.use(rubricRouter);
app.use(ideaRouter);
app.use(districtRouter);
app.use(questionRoute);

app.all('/', (_, res) => res.send('Server is working'));

app.listen(PORT, () => console.log(`Server was start with port ${PORT}`));
