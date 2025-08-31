export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
}

export interface ShuffledQuestion extends Question {
  shuffledAnswers: string[];
  correctShuffledIndex: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  correctIndex: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  answers: QuizAnswer[];
}

export enum QuizState {
  START = 'START',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
