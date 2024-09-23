import z from 'zod';

import { validations } from '@app/common';

const requiredAnswer = z.object({
  question: validations
    .getRequiredNumberValidationSchema()
    .or(validations.getRequiredStringValidationSchema()),
  answer: validations.getRequiredStringValidationSchema(
    'Выберите значение из списка',
  ),
  required: z.literal(true),
});

const optionalAnswer = z.object({
  question: validations
    .getRequiredNumberValidationSchema()
    .or(validations.getRequiredStringValidationSchema()),
  answer: validations
    .getOptionalStringValidationSchema()
    .transform((value) => (!value ? undefined : value)),
  required: z.literal(false),
});

const block = z.object({
  answers: z.array(
    z.discriminatedUnion('required', [requiredAnswer, optionalAnswer]),
  ),
  block_name: validations.getRequiredStringValidationSchema(),
  rate: z
    .array(validations.getOptionalNumberValidationSchema())
    .optional()
    .transform((value) => (!value ? undefined : value)),
});

export const schema = z.object({
  district: validations.getRequiredSelectValidationSchema(),
  blocks: z.array(block),
});
