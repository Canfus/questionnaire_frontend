import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { RtLargeIcon, IppLargeIcon } from '@app/common';

import type { FooterProps } from './footer.interface';
import styles from './footer.module.css';

export const Footer = ({ className, ...props }: FooterProps) => (
  <footer {...props} className={classNames(styles.footer, className)}>
    <div className={styles.footer__links}>
      <Link to="https://prav.tatarstan.ru/">
        <RtLargeIcon primary="#0B2F48" />
      </Link>
      <Link
        to="https://minstroy.tatarstan.ru/"
        className={styles.minstroy__title}
      >
        МИНИСТЕРСТВО СТРОИТЕЛЬСТВА, АРХИТЕКТУРЫ И ЖКХ РЕСПУБЛИКИ ТАТАРСТАН
      </Link>
      <Link to="https://ipp.tatarstan.ru/">
        <IppLargeIcon />
      </Link>
    </div>
    <Link
      to="https://ipp.tatarstan.ru/file/pub/pub_3686481.pdf"
      target="_blank"
    >
      Политика использования персональных данных
    </Link>
  </footer>
);
