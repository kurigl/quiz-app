import React from 'react';
import { ShuffledQuestion } from '../types/Quiz';

interface QuestionProps {
  question: ShuffledQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isAnswered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

const Question: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isAnswered,
  selectedAnswer,
  isCorrect
}) => {
  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  const getAnswerClassName = (index: number) => {
    if (!isAnswered) return 'yes-no-button';
    
    if (index === selectedAnswer) {
      return isCorrect ? 'yes-no-button correct' : 'yes-no-button incorrect';
    }
    
    if (index === question.correctShuffledIndex && !isCorrect) {
      return 'yes-no-button correct-answer';
    }
    
    return 'yes-no-button disabled';
  };

  return (
    <div className="question-container">
      <div className="progress">
        Frage {questionNumber}/{totalQuestions}
      </div>
      
      <h2>{question.question}</h2>
      
      <div className="yes-no-buttons">
        <div className="navigation-buttons">
          <button 
            className={`nav-button ${!canGoBack ? 'disabled' : ''}`} 
            onClick={onPrevious}
            disabled={!canGoBack}
          >
            ❮
          </button>
          <button 
            className={`nav-button primary ${!isAnswered ? 'disabled' : ''}`} 
            onClick={onNext}
            disabled={!isAnswered}
          >
            ❯
          </button>
        </div>
        
        <button 
          className={getAnswerClassName(0)}
          onClick={() => handleAnswerSelect(0)}
          disabled={isAnswered}
        >
          Ja
        </button>
        <button 
          className={getAnswerClassName(1)}
          onClick={() => handleAnswerSelect(1)}
          disabled={isAnswered}
        >
          Nein
        </button>
      </div>
      
      {isAnswered && !isCorrect && (
        <div className="correct-answer-info">
          <div className="correct-answer-text">
            Richtige Antwort: {question.answers[question.correctShuffledIndex]}
          </div>
          <div className="explanation">
            {question.explanation}
          </div>
        </div>
      )}
      
      {isAnswered && isCorrect && (
        <div className="explanation-success">
          <div className="explanation">
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
