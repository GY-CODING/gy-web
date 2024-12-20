'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { locales } from './locales';
import Cookies from 'js-cookie';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LANGUAGE_COOKIE_NAME = 'preferred-language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Get initial language from cookie or browser preference
    const cookieLanguage = Cookies.get(LANGUAGE_COOKIE_NAME) as Language;
    const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en';
    const initialLanguage = cookieLanguage || browserLanguage;
    
    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    Cookies.set(LANGUAGE_COOKIE_NAME, lang, { expires: 365 }); // Cookie expires in 1 year
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = locales[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
