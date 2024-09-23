import z from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Invalid field').default(''),
});

export type Schema = z.infer<typeof schema>;
