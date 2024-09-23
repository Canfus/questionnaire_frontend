export interface Answer {
  id: number | string;
  answer: string;
}

export interface Question {
  id: number | string;
  question: string;
  required: boolean;
  personal_answer_checker: boolean;
  answer_variants: Answer[];
}

export interface TechQuestion {
  id: number | string;
  questions: Question[];
}

export interface BlockQuestion {
  id: number | string;
  questions: Question[];
  title: string;
  description: string;
  has_rate: boolean;
}

export interface EnvQuestion {
  id: number | string;
  blocks: BlockQuestion[];
}
