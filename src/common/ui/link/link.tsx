import classNames from 'classnames';
import { forwardRef } from 'react';
import { Link as LinkPrimitive } from 'react-router-dom';

import { ArrowUpIcon } from '@app/common';

import type { LinkProps } from './link.interface';
import styles from './link.module.css';

export const Link = forwardRef<
  React.ElementRef<typeof LinkPrimitive>,
  LinkProps
>(({ className, children, ...props }, ref) => (
  <LinkPrimitive
    {...props}
    ref={ref}
    className={classNames(styles.link, className)}
  >
    {children}
    <div className={styles.link__icon}>
      <ArrowUpIcon />
    </div>
  </LinkPrimitive>
));
Link.displayName = 'Link';
