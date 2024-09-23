import type { Question } from '@app/api';
import type { RadioOption } from '@app/common';

export const formatAnswerListToSelect = (question: Question): RadioOption[] => {
  if (!question) {
    return [];
  }

  return question.answer_variants.map<RadioOption>((answer) => ({
    id: answer.id,
    value: answer.answer,
    label: answer.answer,
  }));
};
