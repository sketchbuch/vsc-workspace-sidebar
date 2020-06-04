export const getVscodeLang = (vscodeLangConfig: string | undefined): string => {
  let lang = 'en';

  if (vscodeLangConfig) {
    const { locale } = JSON.parse(vscodeLangConfig);
    lang = locale || lang;
  }

  return lang;
};
