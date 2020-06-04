import { DEFAULT_LANG } from '..';

export const getLangFileName = (lang: string): string => {
  if (lang === DEFAULT_LANG) {
    return 'package.nls.json';
  }

  return `package.nls.${lang}.json`;
};
