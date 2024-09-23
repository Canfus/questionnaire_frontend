import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { SlideResponse } from './getSlides.interface';
import { axiosInstance } from '../../instance';
import { STALE_TIME, queryKeys } from '../constants';

export const useGetSlidesQuery = (
  options?: UseSuspenseQueryOptions<SlideResponse, AxiosError>,
) =>
  useSuspenseQuery<SlideResponse, AxiosError>({
    queryKey: [queryKeys.slideList],
    queryFn: async () => {
      const { data } = await axiosInstance.get<SlideResponse>(
        '/settings/site_settings',
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
