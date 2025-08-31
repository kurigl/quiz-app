import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Quiz starten</h1>
      <p>Teste dein Wissen mit 10 zufälligen Fragen!</p>
      <button className="start-button" onClick={onStart}>
        Quiz starten
      </button>
    </div>
  );
};

export default StartScreen;
