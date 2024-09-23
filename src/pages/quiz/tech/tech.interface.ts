import z from 'zod';

import { schema } from './tech.schema';

export type Schema = z.infer<typeof schema>;
