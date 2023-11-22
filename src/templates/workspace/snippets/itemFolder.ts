import * as os from 'os'
import path from 'path'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree'
import { RenderVars } from '../../../webviews/webviews.interface'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { itemButtons } from './itemButtons'
import { itemIconClosed, itemIconOpen, itemIconSelected } from './itemIcons'
import { itemIndent } from './itemIndent'

export const itemFolder = (
  folder: FileTree,
  depth: number,
  isClosed: boolean,
  state: WorkspaceState,
  renderVars: RenderVars,
  isFolderError: boolean = false
): string => {
  const homeDir = os.homedir()
  const { folderPath, folderPathSegment, isRoot, label } = folder
  const folderPathShort = folderPath.replace(homeDir, `~`)
  const indicateSelected = isClosed && state.selected.includes(`${folderPathSegment}${path.sep}`)

  let folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item list__branch-list-item-folder--closable`

  if (indicateSelected) {
    folderClasses += ' list__styled-item--selected'
  }

  if (isRoot) {
    folderClasses += ' list__branch-list-item-folder--root'
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
    <li aria-label="${folderPathShort}" class="${folderClasses}" data-depth="${depth}" data-folder="${folderPathSegment}" data-folderpath="${folderPath}" title="${folderPathShort}">
      ${!isFolderError && indicateSelected ? itemIconSelected(renderVars) : ''}
      ${itemIndent({ depth })}
      <span class="list__element">
        ${isClosed ? itemIconClosed() : itemIconOpen()}
        <span class="list__text">
          <span class="list__title">${label}</span>
        </span>
        ${isFolderError ? '' : itemButtons(folderButtons)}
      </span>
    </li>
  `
}
