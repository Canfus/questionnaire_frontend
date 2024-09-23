import z from 'zod';

export const schema = z.object({
  count: z.array(z.coerce.number().default(1)),
});

export type Schema = z.infer<typeof schema>;
