import classNames from 'classnames';

import { Map, Link } from '@app/common';

import { RubricIdea } from './rubricIdea';
import type { InteractiveMapProps } from './interactiveMap.interface';
import styles from './interactiveMap.module.css';

export const InteractiveMap = ({
  className,
  ...props
}: InteractiveMapProps) => {
  return (
    <div {...props} className={classNames(styles.interactive__map, className)}>
      <Map withSearchParams className={styles.map} />
      <RubricIdea />
      <div className={styles.links}>
        <Link to="/quiz/tech">Пройти транспортный опрос</Link>
        <Link to="/quiz/environment">Пройти опрос оценки качества среды</Link>
      </div>
    </div>
  );
};
