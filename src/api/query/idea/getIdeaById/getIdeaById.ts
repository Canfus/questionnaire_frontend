import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Idea } from '@app/api';

import { axiosInstance } from '../../../instance.ts';
import { STALE_TIME, queryKeys } from '../../constants.ts';

export const useGetIdeaByIdQuery = (
  id: number | string,
  options?: UseQueryOptions<Idea, AxiosError>,
) =>
  useQuery<Idea, AxiosError>({
    queryKey: queryKeys.ideaById(id),
    queryFn: async () => {
      const { data } = await axiosInstance.get<Idea>(
        `/main/get_one_idea/${id}`,
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
