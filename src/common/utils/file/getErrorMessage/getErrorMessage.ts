import { errors } from './getErrorMessage.constants';

export const getErrorMessage = (error: keyof typeof errors): string =>
  errors[error];
