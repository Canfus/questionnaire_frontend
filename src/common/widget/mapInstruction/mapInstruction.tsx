import classNames from 'classnames';

import type { MapInstructionProps } from './mapInstruction.interface';
import styles from './mapInstruction.module.css';

export const MapInstruction = ({
  icon,
  description,
  className,
  ...props
}: MapInstructionProps) => (
  <div {...props} className={classNames(styles.instruction, className)}>
    {icon}
    <p className={styles.instruction__description}>{description}</p>
  </div>
);
