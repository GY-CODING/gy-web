'use client';

import { useParams } from 'next/navigation';
import { locales } from './locales';

export const useTranslate = () => {
  const params = useParams();
  const locale = (params?.lang as 'en' | 'es') || 'en';

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = locales[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }

    return value || key;
  };

  return t;
};
