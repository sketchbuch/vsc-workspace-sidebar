import * as fs from 'fs';
import * as path from 'path';
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
    const fileContent = fs.readFileSync(langFile, 'utf-8');
    translations = JSON.parse(fileContent);
  } catch (error) {
    throw Error(`Unable to read translation file (${langFileName}) - ${error}`);
  }
};
