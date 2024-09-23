import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { EnvQuestion } from '@app/api';
import { axiosInstance } from '@app/api/instance';

import { STALE_TIME, queryKeys } from '../../../constants';

export const useGetEnvQuestionListQuery = (
  options?: Partial<UseQueryOptions<EnvQuestion, AxiosError>>,
) =>
  useQuery<EnvQuestion, AxiosError>({
    queryKey: queryKeys.envQuiz,
    queryFn: async () => {
      const { data } = await axiosInstance.get<EnvQuestion>(
        '/main/get_environmental_questions/',
      );
      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
