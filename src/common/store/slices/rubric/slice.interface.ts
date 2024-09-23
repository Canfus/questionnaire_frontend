import type { Rubric } from '@app/api';

export interface Slice {
  rubricList: Rubric[];
  rubric: Rubric | null;
}
