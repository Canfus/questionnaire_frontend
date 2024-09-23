import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { axiosInstance } from '@app/api/instance';

import type { TechQuizRequestBody } from './postTechQuiz.interface';

export const usePostTechQuizMutation = (
  options?: UseMutationOptions<unknown, AxiosError, TechQuizRequestBody>,
) =>
  useMutation<unknown, AxiosError, TechQuizRequestBody>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<unknown>(
        '/main/add_transport_answer/',
        {
          ...body,
          answers: body.answers.filter((answer) => answer.answer),
        },
      );
      return data;
    },
    ...options,
  });
