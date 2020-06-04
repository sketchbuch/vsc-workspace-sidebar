import { DEFAULT_LANG } from '..';

export const getVscodeLang = (vscodeLangConfig: string | undefined): string => {
  let lang = DEFAULT_LANG;

  if (vscodeLangConfig) {
    const { locale } = JSON.parse(vscodeLangConfig);
    lang = locale || lang;
  }

  return lang;
};
