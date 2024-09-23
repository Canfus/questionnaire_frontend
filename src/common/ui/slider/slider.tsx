import classNames from 'classnames';
import { forwardRef } from 'react';
import { Root, Track, Thumb, Range } from '@radix-ui/react-slider';

import type { SliderProps } from './slider.interface';
import styles from './slider.module.css';

export const Slider = forwardRef<React.ElementRef<typeof Root>, SliderProps>(
  ({ className, min = 1, max = 10, value, defaultValue, ...props }, ref) => {
    const thumbCount = value || defaultValue;

    const dotsCount =
      thumbCount && thumbCount.length > 1
        ? thumbCount.reduce((acc, item) => acc + item, 0)
        : thumbCount![0];

    return (
      <div className={styles.slider__wrapper}>
        <Root
          {...props}
          min={min}
          max={max}
          ref={ref}
          className={classNames(styles.slider, className)}
        >
          <Track className={styles.slider__track}>
            <Range className={styles.slider__range}>
              {value &&
                Array.from({
                  length: dotsCount,
                })
                  .fill(undefined)
                  .map((_, index) => (
                    <div key={index} className={styles.slider__dot} />
                  ))}
            </Range>
          </Track>
          {thumbCount &&
            thumbCount.map((item, index) => (
              <Thumb key={`${item}-${index}`} className={styles.slider__thumb}>
                <span className={styles.thumb__value}>{item}</span>
              </Thumb>
            ))}
        </Root>
        <div className={styles.values__wrapper}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  },
);
Slider.displayName = 'Slider';
