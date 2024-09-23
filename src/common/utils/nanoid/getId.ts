import { customAlphabet } from 'nanoid';

import { PATTERN, LENGTH } from './getId.constants';

export const getId = (length?: number, pattern?: string) =>
  customAlphabet(pattern || PATTERN, length || LENGTH)();
