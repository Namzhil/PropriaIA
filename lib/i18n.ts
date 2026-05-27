import en from '@/dictionaries/en.json';
import es from '@/dictionaries/es.json';

const dictionaries = { en, es };

export type Locale = 'en' | 'es';

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';