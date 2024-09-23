import { SplideSlide } from '@splidejs/react-splide';

import type { Slide } from '@app/api';

export interface SwiperSlideProps
  extends React.ComponentPropsWithoutRef<typeof SplideSlide> {
  slide: Slide;
  className?: string;
}
