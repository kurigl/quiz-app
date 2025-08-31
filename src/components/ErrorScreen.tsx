import React from 'react';

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  return (
    <div className="error-screen">
      <h2>Quiz gerade nicht verfügbar</h2>
      <p>Es gab ein Problem beim Laden des Quiz. Bitte versuchen Sie es erneut.</p>
      <button className="retry-button" onClick={onRetry}>
        Erneut versuchen
      </button>
    </div>
  );
};

export default ErrorScreen;
