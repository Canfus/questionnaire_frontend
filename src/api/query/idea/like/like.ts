import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { LikeCredentials } from './like.interface';
import { axiosInstance } from '../../../instance';

export const useLikeMutation = (
  options?: UseMutationOptions<unknown, AxiosError, LikeCredentials>,
) =>
  useMutation<unknown, AxiosError, LikeCredentials>({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosInstance.get<unknown>(
        `/main/like_idea/${id}`,
        {
          params: {
            type: status ? 'dec' : 'inc',
          },
        },
      );
      return data;
    },
    ...options,
  });
