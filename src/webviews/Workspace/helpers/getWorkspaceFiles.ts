import * as vscode from 'vscode';
import { findWorkspaceFiles } from '../../../utils';

export const getWorkspaceFiles = () => {
  const folder: string = vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
  const depth: number = vscode.workspace.getConfiguration().get('workspaceSidebar.depth') || 0;

  return findWorkspaceFiles(folder, depth).then((wsFiles) => wsFiles);
};
