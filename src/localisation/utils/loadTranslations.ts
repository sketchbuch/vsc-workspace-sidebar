import * as fs from 'fs';
import * as path from 'path';
import { FS_UTF8 } from '../../constants';
import { getLangFileName } from './getLangFileName';
import { Translations } from '../localisation.interface';

export let translations: Translations = {};

export const loadTranslations = (lang: string, extensionPath: string): void => {
  const langFileName = getLangFileName(lang);
  const langFile = path.join(extensionPath, langFileName);

  if (!fs.existsSync(langFile)) {
    throw Error(`Requested translation file does not exist (${langFileName})`);
  }

  if (!fs.lstatSync(langFile).isFile()) {
    throw Error(`Requested translation file is not a file (${langFileName})`);
  }

  try {
    translations = JSON.parse(fs.readFileSync(langFile, FS_UTF8));
  } catch (error) {
    throw Error(`Unable to read translation file (${langFileName}) - ${error}`);
  }
};
