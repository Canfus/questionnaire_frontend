import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Idea } from '@app/api';

import { axiosInstance } from '../../../instance.ts';
import { STALE_TIME, queryKeys } from '../../constants';

export const useGetRubricByIdQuery = (
  rubric: number | string,
  options?: UseQueryOptions<Idea[], AxiosError>,
) =>
  useQuery<Idea[], AxiosError>({
    queryKey: queryKeys.rubricById(rubric),
    queryFn: async () => {
      const { data } = await axiosInstance.get<Idea[]>(
        '/main/get_ideas_by_rubric/',
        {
          params: { rubric },
        },
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
