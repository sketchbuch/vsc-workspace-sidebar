import { Placeholders } from './localisation.interface';
import { translations } from './utils/loadTranslations';
export * from './localisation.interface';
export * from './utils/getVscodeLang';
export * from './utils/loadTranslations';

export const DEFAULT_LANG = 'en';
export const FS_UTF8 = 'utf-8';

export const t = (key: string, placeholders: Placeholders | null = null): string => {
  if (translations.hasOwnProperty(key)) {
    let translation = translations[key];

    if (placeholders !== null) {
      for (const [k, v] of Object.entries(placeholders)) {
        translation = translation.replace(`{{${k}}}`, v);
      }
    }

    return translation;
  }

  return key;
};
