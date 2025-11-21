import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { t } = useI18n();

  return (
    <div className="start-screen">
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
      <button className="start-button" onClick={onStart}>
        {t('app.startButton')}
      </button>
    </div>
  );
};

export default StartScreen;
