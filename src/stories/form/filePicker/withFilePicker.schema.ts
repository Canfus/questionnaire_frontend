import z from 'zod';

export const schema = z.object({
  files: z.array(z.any()).default([]),
});

export type Schema = z.infer<typeof schema>;
