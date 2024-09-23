import z from 'zod';

import type { Message } from './validation.interface';
import { defaultMessages } from './validation.constants';

export const validations = {
  getRequiredStringValidationSchema: (message?: Message) =>
    z
      .string()
      .min(1, message || defaultMessages.defaultStringMessage)
      .default(''),
  getRequiredSelectValidationSchema: (message?: Message) =>
    z
      .string()
      .nullable()
      .refine((value) => value !== null, {
        message: message || defaultMessages.defaultSelectMessage,
      })
      .default(null),
  getOptionalStringValidationSchema: () => z.string().optional(),
  getRequiredNumberValidationSchema: (message?: Message) =>
    z.coerce
      .number()
      .refine(
        (value) =>
          value !== null || value !== undefined || !Number.isNaN(value),
        {
          message: message || defaultMessages.defaultNumberMessage,
        },
      ),
  getOptionalNumberValidationSchema: () => z.coerce.number().optional(),
  getRequiredMapValidationSchema: (message?: Message) =>
    z
      .object({
        lat: validations.getRequiredNumberValidationSchema(message),
        lng: validations.getRequiredNumberValidationSchema(message),
        alt: validations.getOptionalNumberValidationSchema(),
      })
      .nullable()
      .refine((value) => value !== null, {
        message: message || defaultMessages.defaultMapMessage,
      }),
  getNullableFileValidationSchema: () => z.any().nullable(),
  getOptionalEmailValidationSchema: (message?: Message) =>
    z
      .string()
      .email({
        message: message || defaultMessages.defaultEmailMessage,
      })
      .optional(),
};
