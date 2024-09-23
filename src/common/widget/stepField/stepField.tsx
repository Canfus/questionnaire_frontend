import classNames from 'classnames';

import type { StepFieldProps } from './stepField.interface';
import styles from './stepField.module.css';

export const StepField = ({
  stepIndex,
  title,
  label,
  render,
  required,
  className,
  ...props
}: StepFieldProps) => (
  <div {...props} className={classNames(styles.step__wrapper, className)}>
    <h3 className={styles.step__index}>
      Шаг №{stepIndex}
      {required && <span className={styles.step__required}>*</span>}
    </h3>
    <p className={styles.step__title}>{title}</p>
    {label && <p className={styles.step__label}>{label}</p>}
    {render({ required })}
  </div>
);
