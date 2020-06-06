import * as fs from 'fs';
import * as path from 'path';
import { FS_UTF8 } from '../../constants';
import { getLangFileName } from './getLangFileName';
import { Translations } from '../localisation.interface';
import { DEFAULT_LANG } from '..';

export let translations: Translations = {};

export const loadTranslations = (lang: string, extensionPath: string): void => {
  console.log('### lang', lang);
  const defaultLangFile = path.join(extensionPath, getLangFileName(DEFAULT_LANG));
  const langFile = path.join(extensionPath, getLangFileName(lang));
  let fileToLoad = langFile;

  if (!fs.existsSync(defaultLangFile)) {
    console.log('### default error 1');
    throw Error(`Default translation file does not exist (${defaultLangFile})`);
  }

  if (!fs.lstatSync(defaultLangFile).isFile()) {
    console.log('### default error 3');
    throw Error(`Default translation file is not a file (${defaultLangFile})`);
  }

  if (!fs.existsSync(langFile) || !fs.lstatSync(langFile).isFile()) {
    console.log('### requested error');
    fileToLoad = defaultLangFile;
  }

  console.log('### fileToLoad', fileToLoad);

  try {
    translations = JSON.parse(fs.readFileSync(fileToLoad, FS_UTF8));
  } catch (error) {
    throw Error(`Unable to read translation file (${fileToLoad}) - ${error}`);
  }
};
