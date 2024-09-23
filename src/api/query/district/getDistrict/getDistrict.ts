import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { District } from '@app/api';

import { STALE_TIME, queryKeys } from '../../constants';
import { axiosInstance } from '../../../instance';

export const useGetDistrictListQuery = (
  options?: UseSuspenseQueryOptions<District[], AxiosError>,
) =>
  useSuspenseQuery<District[], AxiosError>({
    queryKey: queryKeys.districtList,
    queryFn: async () => {
      const { data } = await axiosInstance.get<District[]>(
        '/main/get_districts/',
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
