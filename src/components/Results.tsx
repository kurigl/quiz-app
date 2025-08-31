import React, { useState, useEffect } from 'react';
import { QuizResult, ShuffledQuestion } from '../types/Quiz';
import confetti from 'canvas-confetti';

interface ResultsProps {
  result: QuizResult;
  questions: ShuffledQuestion[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, questions, onRestart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Animate progress bar
    const timer = setTimeout(() => {
      setProgressWidth(result.percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [result.percentage]);

  const getScoreColor = () => {
    if (result.correctAnswers === 0) return '#e74c3c'; // red
    if (result.correctAnswers <= Math.floor(result.totalQuestions / 3)) return '#e74c3c'; // red (0-3 points)
    if (result.correctAnswers < Math.floor(result.totalQuestions * 0.8)) return '#f39c12'; // yellow (4-7 points)
    return '#27ae60'; // green (8-10 points)
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="results-container">
      <h2>Quiz beendet!</h2>
      
      <div className="score-section">
        <div className="score-text">
          {result.correctAnswers}/{result.totalQuestions} Punkte ({result.percentage}%)
        </div>
        
        <div className="score-bar">
          <div 
            className="score-fill"
            style={{ 
              width: `${progressWidth}%`,
              backgroundColor: getScoreColor(),
              transition: 'width 1s ease-in-out'
            }}
          />
        </div>
      </div>

      <div className="result-actions">
        <button className="details-button" onClick={toggleDetails}>
          {showDetails ? 'Details ausblenden' : 'Details anzeigen'}
        </button>
        
        <button className="restart-button primary" onClick={onRestart}>
          Nochmal spielen
        </button>
      </div>

      {showDetails && (
        <div className="details-section">
          <h3>Detailauswertung</h3>
          {result.answers.map((answer, index) => {
            const question = questions[index];
            return (
              <div key={answer.questionId} className="question-detail">
                <div className="question-text">{question.question}</div>
                <div className={`answer-result ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="selected-answer">
                    Deine Antwort: {question.shuffledAnswers[answer.selectedIndex]}
                    <span className={`result-icon ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  {!answer.isCorrect && (
                    <div className="correct-answer">
                      Richtige Antwort: {question.shuffledAnswers[answer.correctIndex]}
                    </div>
                  )}
                  <div className="explanation-detail">
                    {question.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Results;
