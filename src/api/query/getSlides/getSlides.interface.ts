import type { Slide } from '@app/api';

export interface SlideResponse {
  id: number | string;
  images: Slide[];
  policy: string | null;
}
