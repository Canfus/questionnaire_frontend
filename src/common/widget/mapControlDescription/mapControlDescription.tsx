import classNames from 'classnames';
import { forwardRef } from 'react';

import type { MapControlDescriptionProps } from './mapControlDescription.interface';
import styles from './mapControlDescription.module.css';

export const MapControlDescription = forwardRef<
  HTMLDivElement,
  MapControlDescriptionProps
>(({ icon, title, children, className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={classNames(styles.description, className)}
  >
    <div className={styles.description__header}>
      <div className={styles.header__icon}>{icon}</div>
      <h4 className={styles.header__title}>{title}</h4>
    </div>
    <p className={styles.description__content}>{children}</p>
  </div>
));
MapControlDescription.displayName = 'MapControlDescription';
