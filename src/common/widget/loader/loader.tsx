import classNames from 'classnames';

import { Spinner } from '@app/common';

import type { LoaderProps } from './loader.interface';
import styles from './loader.module.css';

export const Loader = ({ className, ...props }: LoaderProps) => (
  <div {...props} className={classNames(styles.loader, className)}>
    <Spinner />
  </div>
);
