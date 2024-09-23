import z from 'zod';

import { validations } from '@app/common';

export const schema = z.object({
  username: validations.getRequiredStringValidationSchema('Введите Ваше имя'),
  rubric: validations.getRequiredSelectValidationSchema(
    'Выберите рубрику из списка',
  ),
  coordinates: validations
    .getRequiredMapValidationSchema()
    .nullable()
    .refine((value) => value !== null, {
      message: 'Выберите точку на карте',
    })
    .default(null),
  title: validations.getRequiredStringValidationSchema(
    'Введите имя Вашей идеи',
  ),
  description: validations.getRequiredStringValidationSchema(
    'Введите описание Вашей идеи',
  ),
  email: validations
    .getOptionalEmailValidationSchema()
    .transform((email) => (email && email.length === 0 ? undefined : email)),
  file: z.array(validations.getNullableFileValidationSchema()),
});
