import * as vscode from 'vscode';
import { FS_FOLDER_IMAGES_DARK, FS_FOLDER_IMAGES_LIGHT } from '../constants';

export type ImgType = typeof FS_FOLDER_IMAGES_DARK | typeof FS_FOLDER_IMAGES_LIGHT;

export type GenericObject = Record<string, unknown>;

export type GlobalState = vscode.Memento & {
  setKeysForSync(keys: string[]): void;
};
