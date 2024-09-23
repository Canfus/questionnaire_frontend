interface Answer {
  answer?: string;
  question: number | string;
}

export interface TechQuizRequestBody {
  answers: Answer[];
  district: string | null;
}
