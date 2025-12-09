import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en' | 'es' | 'it';

interface Translations {
  [key: string]: any;
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : path;
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('de');
  const [translations, setTranslations] = useState<Translations>({});

  const loadTranslations = async (lang: Language) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to German if loading fails
      if (lang !== 'de') {
        loadTranslations('de');
      }
    }
  };

  useEffect(() => {
    // Load saved language preference or default to German
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      const normalizedLang = savedLang.toLowerCase() as Language;
      if (['de', 'en', 'es', 'it'].includes(normalizedLang)) {
        setLanguageState(normalizedLang);
        // Update localStorage with normalized value
        localStorage.setItem('language', normalizedLang);
      }
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return getNestedValue(translations, key);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
