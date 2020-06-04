import { Placeholders } from '../localisation.interface';
import { translations } from './loadTranslations';

export const t = (key: string, placeholders: Placeholders | null = null): string => {
  if (translations.hasOwnProperty(key)) {
    let translation = translations[key];

    if (placeholders !== null) {
      for (const [k, v] of Object.entries(placeholders)) {
        translation = translation.replace(`%${k}%`, v);
      }
    }

    return translation;
  }

  return key;
};
