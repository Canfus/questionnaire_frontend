import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Idea } from '@app/api';

import { axiosInstance } from '../../../instance';

export const useCreateIdeaMutation = (
  options?: UseMutationOptions<Idea, AxiosError, FormData>,
) =>
  useMutation<Idea, AxiosError, FormData>({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post<Idea>(
        '/main/create_idea/',
        formData,
      );
      return data;
    },
    ...options,
  });
