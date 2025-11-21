import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  const { t } = useI18n();

  return (
    <div className="error-screen">
      <h2>{t('error.title')}</h2>
      <p>{t('error.message')}</p>
      <button className="retry-button" onClick={onRetry}>
        {t('error.retry')}
      </button>
    </div>
  );
};

export default ErrorScreen;
