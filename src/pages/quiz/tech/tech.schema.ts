import z from 'zod';

import { validations } from '@app/common';

const requiredQuestion = z.object({
  question: validations
    .getRequiredNumberValidationSchema()
    .or(validations.getRequiredStringValidationSchema()),
  answer: validations.getRequiredStringValidationSchema(
    'Выберите значение из списка',
  ),
  required: z.literal(true),
});

const optionalQuestion = z.object({
  question: validations
    .getRequiredNumberValidationSchema()
    .or(validations.getRequiredStringValidationSchema()),
  answer: validations
    .getOptionalStringValidationSchema()
    .transform((value) => (!value ? undefined : value)),
  required: z.literal(false),
});

export const schema = z.object({
  district: validations.getRequiredSelectValidationSchema(),
  answers: z.array(
    z.discriminatedUnion('required', [requiredQuestion, optionalQuestion]),
  ),
});
