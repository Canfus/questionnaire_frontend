import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TechQuestion } from '@app/api';
import { axiosInstance } from '@app/api/instance';

import { STALE_TIME, queryKeys } from '../../../constants';

export const useGetTechQuestionListQuery = (
  options?: Partial<UseQueryOptions<TechQuestion, AxiosError>>,
) =>
  useQuery<TechQuestion, AxiosError>({
    queryKey: queryKeys.techQuiz,
    queryFn: async () => {
      const { data } = await axiosInstance.get<TechQuestion>(
        '/main/get_transport_questions/',
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
