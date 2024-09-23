import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { axiosInstance } from '@app/api/instance';

import type { EnvQuizRequestBody } from './postEnvQuiz.interface';

export const usePostEnvQuizMutation = (
  options?: UseMutationOptions<unknown, AxiosError, EnvQuizRequestBody>,
) =>
  useMutation<unknown, AxiosError, EnvQuizRequestBody>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<unknown>(
        '/main/add_environment_answer/',
        {
          ...body,
          blocks: body.blocks.map((block) => ({
            ...block,
            answers: block.answers.filter((answer) => answer.answer),
            rate: block.rate ? parseInt(block.rate.toString()) : null,
          })),
        },
      );
      return data;
    },
    ...options,
  });
