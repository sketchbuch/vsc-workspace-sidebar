import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_LANG, FS_UTF8 } from '..';
import { getLangFileName } from './getLangFileName';
import { Translations } from '../localisation.interface';

export let translations: Translations = {};

export const loadTranslations = (lang: string, extensionPath: string): void => {
  const defaultLangFile = path.join(extensionPath, getLangFileName(DEFAULT_LANG));
  const langFile = path.join(extensionPath, getLangFileName(lang));
  let fileToLoad = langFile;

  if (!fs.existsSync(defaultLangFile)) {
    throw Error(`Default translation file does not exist (${defaultLangFile})`);
  }

  if (!fs.lstatSync(defaultLangFile).isFile()) {
    throw Error(`Default translation file is not a file (${defaultLangFile})`);
  }

  if (!fs.existsSync(langFile) || !fs.lstatSync(langFile).isFile()) {
    fileToLoad = defaultLangFile;
  }

  try {
    translations = JSON.parse(fs.readFileSync(fileToLoad, FS_UTF8));
  } catch (error) {
    throw Error(`Unable to read translation file (${fileToLoad}) - ${error}`);
  }
};
