export const getLangFileName = (lang: string): string => {
  if (lang === 'en') {
    return 'package.nls.json';
  }

  return `package.nls.${lang}.json`;
};
