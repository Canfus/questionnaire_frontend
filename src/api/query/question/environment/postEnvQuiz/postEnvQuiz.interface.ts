interface Answer {
  answer?: string;
  question: number | string;
}

interface Block {
  answers: Answer[];
  block_name: string;
  rate?: (number | undefined)[];
}

export interface EnvQuizRequestBody {
  blocks: Block[];
  district: string | null;
}
