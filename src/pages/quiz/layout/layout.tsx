import { useMemo } from 'react';
import { useMatch, Navigate, Outlet } from 'react-router-dom';

import { routenames } from '@app/router';

import styles from './layout.module.css';

export const QuizLayout = () => {
  const rootQuizPage = useMatch('/quiz/*');

  const isTechQuiz = rootQuizPage?.params['*']?.includes(
    routenames.TECHNIQUE_QUIZ,
  );
  const isEnvQuiz = rootQuizPage?.params['*']?.includes(routenames.ENV_QUIZ);

  const title = useMemo<string>(() => {
    if (isTechQuiz) {
      return 'Транспортный опрос';
    } else if (isEnvQuiz) {
      return 'Опрос качества среды';
    }

    return '';
  }, [isEnvQuiz, isTechQuiz]);

  const content = useMemo<React.JSX.Element>(() => {
    if (isTechQuiz) {
      return (
        <>
          <p className={styles.layout__description}>
            Перед Вами опрос, составленный с целью изучить значимые культурные,
            бытовые, транспортные и экономические связи на территории Камской
            агломерации.
          </p>
          <p className={styles.layout__description}>
            Ответив на заданные вопросы, Вы поможете команде проекта
            сформировать стратегию пространственного развития ― мастер-план
            Камской агломерации. В ходе заполнения анкеты мы просим Вас
            рассказать о себе и высказать некоторые суждения.
          </p>
          <p className={styles.layout__description}>
            Всю информацию мы собираем <strong>анонимно</strong>, а после
            завершения сбора данных работаем с ней в обобщённом виде. Результаты
            анкетирования станут важным основанием для принятия решений в ходе
            разработки мастер-плана.
          </p>
          <p className={styles.layout__description}>
            Вопросы, помеченные звездочкой (
            <strong style={{ color: 'var(--danger-color)' }}>*</strong>)
            являются обязательными для заполнения.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.layout__description}>
            Приглашаем пройти короткий опрос для субъективного определения
            состояния городской среды в Вашем населенном пункте.
          </p>
          <p className={styles.layout__description}>
            Всю информацию мы собираем <strong>анонимно</strong>, а после
            завершения сбора данных работаем с ней в обобщённом виде. Заполнение
            анкеты займёт у Вас <strong>не более 15-20 минут</strong>.
            Результаты анкетирования станут основанием для принятия решений по
            стратегии развития Камской агломерации.
          </p>
          <p className={styles.layout__description}>
            Вопросы, помеченные звездочкой (
            <strong style={{ color: 'var(--danger-color)' }}>*</strong>)
            являются обязательными для заполнения.
          </p>
        </>
      );
    }
  }, [isTechQuiz]);

  if (!rootQuizPage?.params['*']) {
    return <Navigate to={routenames.TECHNIQUE_QUIZ} />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.title__wrapper}>
        <h1 className={styles.layout__title}>{title}</h1>
        {content}
        <Outlet />
      </div>
    </div>
  );
};
