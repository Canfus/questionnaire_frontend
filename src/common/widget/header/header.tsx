import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  useUserAgent,
  LogoLarge,
  LogoSmall,
  NavLink,
  IconButton,
  RtSmallIcon,
  MinstroySmallIcon,
  IppSmallIcon,
  MenuIcon,
  CloseIcon,
  Menu,
} from '@app/common';

import type { HeaderProps } from './header.interface';
import styles from './header.module.css';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isTablet] = useUserAgent({ breakpoint: 1280 });

  const containerRef = useRef<HTMLElement>(null);

  const onMenuChange = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isTablet) {
      setMenuOpen(false);
    }
  }, [isTablet]);

  return (
    <>
      <header
        {...props}
        className={classNames(styles.header, className)}
        ref={containerRef}
      >
        <div className={styles.header__wrapper}>
          <div className={styles.header__logo__wrapper}>
            {isTablet ? <LogoSmall /> : <LogoLarge />}
            <Link to="/" className={styles.header__title}>
              Камская агломерация
            </Link>
          </div>
          {isTablet ? (
            <IconButton
              icon={menuOpen ? <CloseIcon /> : <MenuIcon />}
              onClick={onMenuChange}
              aria-label="close menu"
            />
          ) : (
            <>
              <div className={styles.header__link}>
                <NavLink to="/">Карта идей</NavLink>
                <NavLink to="/quiz/tech">Транспортный опрос</NavLink>
                <NavLink to="/quiz/environment">Оценка качества среды</NavLink>
              </div>
              <div className={styles.header_logos}>
                <Link to="https://prav.tatarstan.ru/">
                  <RtSmallIcon />
                </Link>
                <Link to="https://minstroy.tatarstan.ru/">
                  <MinstroySmallIcon />
                </Link>
                <Link to="https://ipp.tatarstan.ru/">
                  <IppSmallIcon />
                </Link>
              </div>
            </>
          )}
        </div>
        <Menu
          open={menuOpen}
          onOpenChange={onMenuChange}
          container={containerRef.current}
          className={styles.dialog}
        />
      </header>
    </>
  );
};
