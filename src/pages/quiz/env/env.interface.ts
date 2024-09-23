import z from 'zod';

import { schema } from './env.schema';

export type Schema = z.infer<typeof schema>;
