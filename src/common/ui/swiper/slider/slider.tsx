import classNames from 'classnames';
import { Splide, SplideTrack } from '@splidejs/react-splide';

import { ArrowLeftIcon, ArrowRightIcon } from '@app/common';

import { Slide } from '../slide';
import type { SliderProps } from './slider.interface';
import styles from './slider.module.css';

export const SliderComponent = ({
  slides,
  className,
  ...props
}: SliderProps) => (
  <Splide
    {...props}
    hasTrack={false}
    options={{
      autoplay: true,
      type: 'loop',
      keyboard: 'global',
      interval: 10000,
      classes: {
        pagination: styles.splide__pagination,
        page: styles.pagination__bullet,
      },
    }}
    className={classNames(styles.splide, className)}
  >
    <SplideTrack>
      {slides.map((slide) => (
        <Slide key={slide.id} slide={slide} />
      ))}
    </SplideTrack>
    <div className="splide__arrows">
      <button
        aria-label="Previous slide"
        type="button"
        className={classNames(
          styles.splide__navigation,
          styles.prev,
          'splide__arrow',
          'splide__arrow--prev',
        )}
      >
        <ArrowLeftIcon />
      </button>
      <button
        aria-label="Next slide"
        type="button"
        className={classNames(
          styles.splide__navigation,
          styles.next,
          'splide__arrow',
          'splide__arrow--next',
        )}
      >
        <ArrowRightIcon />
      </button>
    </div>
  </Splide>
);
