import React, { useState, useEffect } from 'react';
import './App.css';
import { Question as QuestionType, ShuffledQuestion, QuizState, QuizResult, QuizAnswer } from './types/Quiz';
import { loadQuestions, selectRandomQuestions, shuffleAnswers } from './utils/quizUtils';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Results from './components/Results';
import ErrorScreen from './components/ErrorScreen';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.START);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    loadQuestionsData();
  }, []);

  const loadQuestionsData = async () => {
    try {
      const questions = await loadQuestions();
      setAllQuestions(questions);
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuizState(QuizState.ERROR);
    }
  };

  const startQuiz = () => {
    if (allQuestions.length < 10) {
      setQuizState(QuizState.ERROR);
      return;
    }

    const selectedQuestions = selectRandomQuestions(allQuestions, 10);
    const shuffledQuestions = selectedQuestions.map(shuffleAnswers);
    
    setCurrentQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setQuizState(QuizState.PLAYING);
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
      <div className="quiz-container">
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default App;
