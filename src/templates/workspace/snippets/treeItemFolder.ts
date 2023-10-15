import * as os from 'os'
import path from 'path'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree'
import { RenderVars } from '../../../webviews/webviews.interface'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { listItemButtons } from './listItemButtons'
import { listItemIcon } from './listItemIcon'
import { treeIconClosed, treeIconOpen } from './treeIcons'
import { treeIndent } from './treeIndent'

export const treeItemFolder = (
  folder: FileTree,
  depth: number,
  isClosed: boolean,
  state: WorkspaceState,
  renderVars: RenderVars
): string => {
  const homeDir = os.homedir()
  const { folderPath, folderPathSegment, isRoot, label } = folder
  const folderPathShort = folderPath.replace(homeDir, `~`)
  const indicateSelected = isClosed && state.selected.includes(`${folderPathSegment}${path.sep}`)

  let folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item`

  if (indicateSelected) {
    folderClasses += ' list__styled-item--selected'
  }

  if (!isRoot) {
    folderClasses += ' list__branch-list-item-folder-closable'
  }

  const buttons: ConfigButtons = [
    {
      codicon: 'browser',
      file: folderPath,
      key: 'open-filemanager',
      label,
    },
  ]

  const folderButtons = getWorkspaceButtons({ buttons, renderVars })

  return `
      <li aria-label="${folderPathShort}" class="${folderClasses}" data-depth="${depth}" data-folder="${folderPathSegment}" title="${folderPathShort}">
        ${indicateSelected ? listItemIcon(renderVars) : ''}
        ${treeIndent(depth)}
        <span class="list__element">
          ${isClosed ? treeIconClosed() : treeIconOpen()}
          <span class="list__text">
            <span class="list__title">${label}</span>
          </span>
          ${listItemButtons(folderButtons)}
        </span>
      </li>
    `
}
