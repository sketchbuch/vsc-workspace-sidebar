import { t } from 'vscode-ext-localisation'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  File,
  FileTree,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getLabel } from '../../../webviews/Workspace/helpers/getLabel'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getListClasses } from '../../helpers/getListClasses'
import { itemFile } from './itemFile'
import { itemFolder } from './itemFolder'

export const externalWorkspace = (state: WorkspaceState, renderVars: RenderVars): string => {
  if (renderVars.isExternalWs) {
    const { selected } = state
    const { showTree } = renderVars
    const fileName = getLastPathSegment(selected) || selected
    const path = selected.replace(fileName, '').slice(0, -1)
    const folderName = getLastPathSegment(path) || path
    const file: File = {
      cleanedLabel: getLabel(selected, true),
      file: selected,
      isSelected: true,
      label: getLabel(selected, false),
      path,
      showPath: false,
    }
    const classes = getListClasses(showTree)
    const fileTree: FileTree = {
      compactedFolders: [],
      files: [],
      folderPath: path,
      folderPathSegment: folderName,
      isRoot: true,
      label: folderName,
      sub: [],
    }

    return `
        <div class="list__extws list__styled-pusher">
          <ul class="${classes}">
            ${itemFolder({
              depth: 0,
              folder: fileTree,
              isClosable: false,
              isClosed: false,
              renderVars,
              result: 'ok',
              state,
            })}
            ${itemFile({ depth: 0, file, state, renderVars })}
          </ul>

          <div class="list__extws-controls list__styled-pusher-controls">
            <vscode-button class="list__extws-update-roots" id="addToFolderRoots">
              ${t('workspace.list.extWs.saveButton')}
            </vscode-button>
          </div>

          <div class="list__folder-divider list__styled-pusher-divider">
            <vscode-divider class="list__folder-vscodedivider"></vscode-divider>
          </div
        </div>
      `
  }

  return ''
}
