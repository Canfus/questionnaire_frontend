import { Route, Routes } from 'react-router-dom';

import { Layout, IdeaMapPage, TechPage, EnvPage, QuizLayout } from '@app/pages';

import { routenames } from './routenames';

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={routenames.HOME} element={<IdeaMapPage />} />
      <Route path={routenames.QUIZ} element={<QuizLayout />}>
        <Route path={routenames.TECHNIQUE_QUIZ} element={<TechPage />} />
        <Route path={routenames.ENV_QUIZ} element={<EnvPage />} />
      </Route>
    </Route>
  </Routes>
);
