import type { SelectOption } from '@app/common';
import type { Rubric } from '@app/api';

export const formatRubricListToSelect = (rubrics: Rubric[]): SelectOption[] => {
  if (!rubrics || !rubrics.length) {
    return [];
  }

  return rubrics.map<SelectOption>((rubric) => ({
    id: rubric.id,
    value: String(rubric.id),
    label: rubric.title,
  }));
};
