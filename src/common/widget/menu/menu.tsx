import classNames from 'classnames';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import {
  DialogPrimitive,
  NavLink,
  RtLargeIcon,
  IppLargeIcon,
} from '@app/common';

import type { MenuProps } from './menu.interface';
import styles from './menu.module.css';

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ className, onOpenChange, container, ...props }, ref) => (
    <DialogPrimitive
      {...props}
      onOpenChange={onOpenChange}
      container={container}
      ref={ref}
      className={classNames(styles.menu, className)}
      modal={false}
    >
      <NavLink onClick={onOpenChange} to="/">
        Карта идей
      </NavLink>
      <NavLink onClick={onOpenChange} to="/quiz/tech">
        Транспортный опрос
      </NavLink>
      <NavLink onClick={onOpenChange} to="/quiz/environment">
        Оценка качества среды
      </NavLink>
      <div className={styles.logos__wrapper}>
        <Link to="https://prav.tatarstan.ru/">
          <RtLargeIcon />
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
    </DialogPrimitive>
  ),
);
Menu.displayName = 'Menu';
