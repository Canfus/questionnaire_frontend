import type { SplideProps } from '@splidejs/react-splide';

import type { Slide } from '@app/api';

export interface SliderProps extends SplideProps {
  slides: Slide[];
  className?: string;
}
