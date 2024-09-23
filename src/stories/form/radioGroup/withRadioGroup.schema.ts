import z from 'zod';

export const schema = z.object({
  item: z
    .string()
    .nullable()
    .refine((value) => value !== null, { message: 'Pick a value' })
    .default(null),
});

export type Schema = z.infer<typeof schema>;
