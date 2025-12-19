import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { t } = useI18n();

  return (
    <div className="start-screen">
      <div className="start-header">
        {/* Platzhalter für Header-Bereich */}
      </div>
      <div className="start-main">
        <h1>{t('app.title')}</h1>
        <div className="start-title">
          <div className="title-main">{t('app.subtitleMain')}</div>
          <div className="title-sub">{t('app.subtitleSub')}</div>
        </div>
        <button className="start-button" onClick={onStart}>
          {t('app.startButton')}
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
