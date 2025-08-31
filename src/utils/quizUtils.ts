import { Question, ShuffledQuestion } from '../types/Quiz';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectRandomQuestions = (questions: Question[], count: number = 10): Question[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

export const shuffleAnswers = (question: Question): ShuffledQuestion => {
  const originalAnswers = [...question.answers];
  const shuffledAnswers = shuffleArray(originalAnswers);
  
  const correctAnswer = originalAnswers[question.correctIndex];
  const correctShuffledIndex = shuffledAnswers.indexOf(correctAnswer);
  
  return {
    ...question,
    shuffledAnswers,
    correctShuffledIndex
  };
};

export const loadQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questions = await response.json();
    
    // Validate question structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format');
    }
    
    for (const question of questions) {
      if (!question.id || !question.question || !Array.isArray(question.answers) || 
          question.answers.length !== 4 || typeof question.correctIndex !== 'number' ||
          question.correctIndex < 0 || question.correctIndex > 3 || !question.explanation) {
        throw new Error('Invalid question structure');
      }
    }
    
    return questions;
  } catch (error) {
    console.error('Failed to load questions:', error);
    throw error;
  }
};
