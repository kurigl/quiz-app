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
    if (!isAnswered) return 'answer-option';
    
    if (index === selectedAnswer) {
      return isCorrect ? 'answer-option correct' : 'answer-option incorrect';
    }
    
    if (index === question.correctShuffledIndex && !isCorrect) {
      return 'answer-option correct-answer';
    }
    
    return 'answer-option disabled';
  };

  return (
    <div className="question-container">
      <div className="progress">
        Frage {questionNumber}/{totalQuestions}
      </div>
      
      <h2>{question.question}</h2>
      
      <div className="answers">
        {question.shuffledAnswers.map((answer, index) => (
          <label 
            key={index} 
            className={getAnswerClassName(index)}
          >
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            />
            <span className="answer-text">{answer}</span>
          </label>
        ))}
      </div>
      
      {isAnswered && !isCorrect && (
        <div className="correct-answer-info">
          <div className="correct-answer-text">
            Richtige Antwort: {question.shuffledAnswers[question.correctShuffledIndex]}
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
      
      <div className="navigation-buttons">
        {canGoBack && (
          <button className="nav-button" onClick={onPrevious}>
            Zurück
          </button>
        )}
        {isAnswered && (
          <button className="nav-button primary" onClick={onNext}>
            Weiter
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
