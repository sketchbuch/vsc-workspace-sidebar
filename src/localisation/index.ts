import { DeepTranslations, Placeholders, Translations } from './localisation.interface';
import { translations } from './utils/loadTranslations';
export * from './localisation.interface';
export * from './utils/getVscodeLang';
export * from './utils/loadTranslations';

export const DEFAULT_LANG = 'en';

const deepCache: Translations = {};

export const t = (key: string, placeholders: Placeholders | null = null): string => {
  let translation = translations[key] || key;

  // Deep check if no flat translation exists...
  if (key.includes('.') && !translations[key]) {
    if (deepCache[key]) {
      translation = deepCache[key];
    } else {
      deepCache[key] = key;

      const paths = key.split('.');
      const finalPath = paths.pop();

      let translationPath: DeepTranslations | string = translations;
      let path: string | undefined;

      while ((path = paths.shift())) {
        if (typeof translationPath !== 'string' && translationPath[path]) {
          translationPath = translationPath[path];
        }
      }

      if (finalPath && typeof translationPath !== 'string') {
        if (translationPath[finalPath] && typeof translationPath[finalPath] === 'string') {
          translation = translationPath[finalPath] as string;
          deepCache[key] = translation;
        }
      }
    }
  }

  if (translation !== key && placeholders !== null) {
    for (const [k, v] of Object.entries(placeholders)) {
      translation = translation.replace(`{{${k}}}`, v);
    }
  }

  return translation;
};
