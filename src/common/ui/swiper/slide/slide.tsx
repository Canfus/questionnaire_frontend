import classNames from 'classnames';
import { SplideSlide } from '@splidejs/react-splide';

import type { SwiperSlideProps } from './slide.interface';
import styles from './slide.module.css';

export const Slide = ({ slide, className, ...props }: SwiperSlideProps) => (
  <SplideSlide {...props} className={classNames(styles.slide, className)}>
    <img
      src={`${import.meta.env.VITE_MEDIA_URL}${slide.background}`}
      alt={`${import.meta.env.VITE_MEDIA_URL}${slide.background}`}
      className={styles.slide__background}
    />
    <div className={styles.slide__content}>
      <img
        src={`${import.meta.env.VITE_MEDIA_URL}${slide.image}`}
        alt={`${import.meta.env.VITE_MEDIA_URL}${slide.image}`}
        className={styles.content__image}
      />
      <div className={styles.content}>
        <h3 className={styles.content__title}>{slide.title}</h3>
        <p className={styles.content__description}>{slide.description}</p>
      </div>
    </div>
  </SplideSlide>
);
