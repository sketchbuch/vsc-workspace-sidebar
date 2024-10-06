import * as os from 'os'
import { cleanLabel } from '../../../utils/string/cleanLabel'
import {
  FileTree,
  FindFileResult,
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
  result: FindFileResult
  state: WorkspaceState
}

export const itemFolder = ({
  depth,
  folder,
  isClosable = true,
  isClosed,
  isFolderError = false,
  renderVars,
  result,
  state,
}: ItemFolderProps): string => {
  const homeDir = os.homedir()
  const { folderPath, folderPathSegment, isRoot, label } = folder
  const folderPathShort = folderPath.replace(homeDir, `~`)
  const indicateSelected = isClosed && state.selected.startsWith(folderPath)
  const visibleLabel = isRoot && renderVars.cleanLabels ? cleanLabel(label) : label

  let folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item`

  if (isClosable && !state.search.term) {
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
      label: visibleLabel,
    },
  ]

  if (isRoot && result !== 'loading') {
    buttons.unshift({
      codicon: 'refresh',
      file: folderPathShort,
      key: 'refetch-rootfolder',
      label: visibleLabel,
    })
  }

  const folderButtons = getWorkspaceButtons({ buttons, renderVars })
  const isCompacted = folder.compactedFolders.length > 0

  return `
    <li 
      aria-label="${folderPathShort}"
      class="${folderClasses}"
      data-depth="${depth}"
      data-folder="${folderPathSegment}"
      data-folderpath="${folderPath}" 
      data-iscompacted="${isCompacted}"
      title="${folderPathShort}"
    >
      ${!isFolderError && indicateSelected ? itemIconSelected(renderVars) : ''}
      ${itemIndent({ depth })}
      <span class="list__element">
        ${isClosed ? itemIconClosed() : itemIconOpen()}
        <span class="list__text">
          <span class="list__title">${visibleLabel}</span>
        </span>
        ${itemButtons(folderButtons)}
      </span>
    </li>
  `
}
