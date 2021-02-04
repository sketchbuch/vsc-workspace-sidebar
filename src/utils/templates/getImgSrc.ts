import * as path from 'path';
import * as vscode from 'vscode';

export const getImgSrc = (uri: vscode.Uri, icon: string) => `${uri}${path.sep}${icon}.svg`;
