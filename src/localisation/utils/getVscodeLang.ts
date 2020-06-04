export const getVscodeLang = (vscodeLangConfig: string): string => {
  let lang = 'en';

  if (vscodeLangConfig) {
    const { locale } = JSON.parse(vscodeLangConfig);
    lang = locale || lang;
  }

  return lang;
};
