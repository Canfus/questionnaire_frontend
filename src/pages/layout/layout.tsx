import classNames from 'classnames';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useCookie } from 'react-use';

import { useGetSlidesQuery } from '@app/api';
import {
  useScrollWindow,
  useNotification,
  Header,
  SliderComponent,
  IconButton,
  ArrowUpIcon,
  Footer,
} from '@app/common';

import styles from './layout.module.css';

export const Layout = () => {
  const { data } = useGetSlidesQuery();
  const [isTop, ref] = useScrollWindow({ offset: 512 });
  const { callNotification } = useNotification();
  const [cookie, update] = useCookie('cookie_content_status');

  useEffect(() => {
    if (!cookie) {
      const onAcceptCookiesClick = () => {
        update('accept');
      };

      callNotification({
        type: 'custom',
        title: 'Мы используем cookies',
        timerAutoClose: 9007199254740,
        content: (
          <div>
            <p>
              Используя этот сайт, вы подтверждаете свое согласие на
              использование файлов cookie
            </p>
            <button
              type="button"
              onClick={onAcceptCookiesClick}
              className={styles.notification__accept}
            >
              Принять
            </button>
          </div>
        ),
      });
    }
  }, [update, callNotification, cookie]);

  return (
    <div className={styles.layout}>
      <Header />
      <SliderComponent slides={data.images} />
      <Outlet />
      <IconButton
        ref={ref}
        type="button"
        icon={<ArrowUpIcon />}
        className={classNames(styles.layout__button, {
          [styles['layout__button--visible']]: isTop,
        })}
      />
      <Footer />
    </div>
  );
};
