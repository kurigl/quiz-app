import React, { useState, useEffect } from 'react';
import './App.css';
import { Question as QuestionType, ShuffledQuestion, QuizState, QuizResult, QuizAnswer } from './types/Quiz';
import { loadQuestions, selectRandomQuestions, shuffleAnswers, validateQuestionStructure } from './utils/quizUtils';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Results from './components/Results';
import ErrorScreen from './components/ErrorScreen';
import LanguageSwitcher from './components/LanguageSwitcher';

const QuizApp: React.FC = () => {
  const { t, language } = useI18n();
  const [quizState, setQuizState] = useState<QuizState>(QuizState.START);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    loadQuestionsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const loadQuestionsData = async () => {
    try {
      const questions = await loadQuestions(language);
      setAllQuestions(questions);
      
      // Reset quiz state when language changes and quiz is running
      if (quizState === QuizState.PLAYING || quizState === QuizState.RESULTS) {
        setQuizState(QuizState.START);
        setCurrentQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setResult(null);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuizState(QuizState.ERROR);
    }
  };

  const startQuiz = () => {
    // Validate question structure
    const validation = validateQuestionStructure(allQuestions);
    if (!validation.isValid) {
      console.error('Validierungsfehler:', validation.error);
      setQuizState(QuizState.ERROR);
      return;
    }

    try {
      const selectedQuestions = selectRandomQuestions(allQuestions, 2);
      const shuffledQuestions = selectedQuestions.map(shuffleAnswers);
      
      setCurrentQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setResult(null);
      setQuizState(QuizState.PLAYING);
    } catch (error) {
      console.error('Fehler beim Auswählen der Fragen:', error);
      setQuizState(QuizState.ERROR);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctShuffledIndex;
    
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
      correctIndex: currentQuestion.correctShuffledIndex
    };

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = newAnswer;
    setAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    const correctCount = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = currentQuestions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const quizResult: QuizResult = {
      totalQuestions,
      correctAnswers: correctCount,
      percentage,
      answers
    };

    setResult(quizResult);
    setQuizState(QuizState.RESULTS);
  };

  const restartQuiz = () => {
    setQuizState(QuizState.START);
  };

  const retryLoadQuestions = () => {
    setQuizState(QuizState.START);
    loadQuestionsData();
  };

  const renderCurrentScreen = () => {
    switch (quizState) {
      case QuizState.START:
        return <StartScreen onStart={startQuiz} />;
      
      case QuizState.PLAYING:
        const currentQuestion = currentQuestions[currentQuestionIndex];
        const currentAnswer = answers[currentQuestionIndex];
        const isAnswered = currentAnswer !== undefined;
        
        return (
          <Question
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentQuestions.length}
            onAnswer={handleAnswer}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            canGoBack={currentQuestionIndex > 0}
            isAnswered={isAnswered}
            selectedAnswer={currentAnswer?.selectedIndex ?? null}
            isCorrect={currentAnswer?.isCorrect ?? null}
          />
        );
      
      case QuizState.RESULTS:
        return result ? (
          <Results
            result={result}
            questions={currentQuestions}
            onRestart={restartQuiz}
          />
        ) : null;
      
      case QuizState.ERROR:
        return <ErrorScreen onRetry={retryLoadQuestions} />;
      
      default:
        return <StartScreen onStart={startQuiz} />;
    }
  };

  return (
    <div className="App">
      <div className="orientation-notice">
        <span className="notice-text">{t('app.orientationNotice')}</span>
      </div>
      <div className="quiz-container">
        <LanguageSwitcher />
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <QuizApp />
    </I18nProvider>
  );
};

export default App;
