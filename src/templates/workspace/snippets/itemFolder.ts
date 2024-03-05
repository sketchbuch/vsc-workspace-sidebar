import * as os from 'os'
import {
  FileTree,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { itemButtons } from './itemButtons'
import { itemIconClosed, itemIconOpen, itemIconSelected } from './itemIcons'
import { itemIndent } from './itemIndent'

export type ItemFolderProps = {
  depth: number
  folder: FileTree
  isClosable?: boolean
  isClosed: boolean
  isFolderError?: boolean
  renderVars: RenderVars
  state: WorkspaceState
}

export const itemFolder = ({
  depth,
  folder,
  isClosable = true,
  isClosed,
  isFolderError = false,
  renderVars,
  state,
}: ItemFolderProps): string => {
  const homeDir = os.homedir()
  const { folderPath, folderPathSegment, isRoot, label } = folder
  const folderPathShort = folderPath.replace(homeDir, `~`)
  const indicateSelected = isClosed && state.selected.startsWith(folderPath)

  let folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item`

  if (isClosable) {
    folderClasses += ' list__branch-list-item-folder--closable'
  }

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
