import classNames from 'classnames';
import { forwardRef } from 'react';
import { NavLink as RouterNavLink, type NavLinkProps } from 'react-router-dom';

import styles from './navLink.module.css';

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, children, ...props }, ref) => (
    <RouterNavLink
      {...props}
      ref={ref}
      className={({ isActive }) =>
        classNames(
          styles.link,
          {
            [styles['link--active']]: isActive,
          },
          className,
        )
      }
    >
      {children}
    </RouterNavLink>
  ),
);
NavLink.displayName = 'NavLink';
