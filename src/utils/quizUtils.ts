import { Question, ShuffledQuestion } from '../types/Quiz';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectRandomQuestions = (questions: Question[], questionsPerCategory: number = 2): Question[] => {
  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const category = question.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Get all unique categories
  const categories = Object.keys(questionsByCategory);
  
  // Validate: Each category must have at least questionsPerCategory questions
  for (const category of categories) {
    if (questionsByCategory[category].length < questionsPerCategory) {
      throw new Error(`Kategorie "${category}" hat nur ${questionsByCategory[category].length} Fragen, benötigt aber mindestens ${questionsPerCategory}.`);
    }
  }
  
  // Select questionsPerCategory random questions from each category
  const selectedQuestions: Question[] = [];
  for (const category of categories) {
    const categoryQuestions = shuffleArray(questionsByCategory[category]);
    const selected = categoryQuestions.slice(0, questionsPerCategory);
    selectedQuestions.push(...selected);
  }
  
  return shuffleArray(selectedQuestions);
};

export const validateQuestionStructure = (questions: Question[]): { isValid: boolean; error?: string; categories?: number } => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { isValid: false, error: 'Keine Fragen gefunden.' };
  }

  // Group by category
  const categories = new Set<string>();
  for (const question of questions) {
    if (question.category) {
      categories.add(question.category);
    }
  }

  const categoryCount = categories.size;
  
  if (categoryCount < 5) {
    return { isValid: false, error: `Es wurden nur ${categoryCount} Kategorien gefunden. Es werden mindestens 5 Kategorien benötigt.` };
  }

  // Check if each category has at least 2 questions
  const questionsByCategory = questions.reduce((acc, question) => {
    const category = question.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  for (const category of categories) {
    const categoryQuestions = questionsByCategory[category];
    if (categoryQuestions.length < 2) {
      return { 
        isValid: false, 
        error: `Die Kategorie "${category}" hat nur ${categoryQuestions.length} Frage(n). Jede Kategorie benötigt mindestens 2 Fragen.` 
      };
    }
  }

  return { isValid: true, categories: categoryCount };
};

export const shuffleAnswers = (question: Question): ShuffledQuestion => {
  // For Ja/Nein questions, no shuffling needed
  return {
    ...question,
    shuffledAnswers: question.answers,
    correctShuffledIndex: question.correctIndex
  };
};

export const loadQuestions = async (language: string = 'de'): Promise<Question[]> => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + `/questions-${language}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questions = await response.json();
    
    // Validate question structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format');
    }
    
    for (const question of questions) {
      console.log('Validating question:', question);
      if (!question.id || !question.question || !Array.isArray(question.answers) || 
          question.answers.length !== 2 || typeof question.correctIndex !== 'number' ||
          question.correctIndex < 0 || question.correctIndex > 1 || !question.explanation ||
          !question.category) {
        console.error('Invalid question:', question);
        throw new Error('Invalid question structure');
      }
    }
    
    return questions;
  } catch (error) {
    console.error('Failed to load questions:', error);
    throw error;
  }
};
