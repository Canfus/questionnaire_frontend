import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Rubric } from '@app/api';

import { axiosInstance } from '../../../instance.ts';
import { STALE_TIME, queryKeys } from '../../constants.ts';

export const useGetRubricListQuery = (
  options?: UseSuspenseQueryOptions<Rubric[], AxiosError>,
) =>
  useSuspenseQuery<Rubric[], AxiosError>({
    queryKey: [queryKeys.rubricList],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Rubric[]>('/main/all_rubrics');
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
