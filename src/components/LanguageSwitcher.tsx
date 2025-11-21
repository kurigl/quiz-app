import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'de' ? 'active' : ''}`}
        onClick={() => setLanguage('de')}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-label="Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
