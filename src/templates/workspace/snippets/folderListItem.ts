import * as vscode from 'vscode'

export const folderListItem = (folder: vscode.WorkspaceFolder): string => {
  const { uri, name } = folder

  return `
    <li class="list__folder-list-item list__styled-item">
      <span class="list__element" data-file="${uri.fsPath}" tabindex="0" title="${name}">
        <span class="list__title">${name}</span>
        <span class="list__description">${uri.fsPath}</span>
      </span>
    </li>
  `
}
