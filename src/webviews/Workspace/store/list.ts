import { PayloadAction } from '@reduxjs/toolkit'
import * as os from 'os'
import { getShowTreeConfig } from '../../../config/treeview'
import { checkFile } from '../../../utils/fs/checkFile'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  FindFileResult,
  WorkspaceCacheRootFolders,
  WorkspaceState,
} from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceCacheRootFolders>
): void => {
  const homeDir = os.homedir()
  const showTree = getShowTreeConfig()

  state.rootFolders = action.payload.map(({ configId, depth, files, folderPath }) => {
    const folderName = getLastPathSegment(folderPath) || folderPath
    const convertedFiles = convertWsFiles(folderPath, files, state.selected)
    const visibleFiles = getVisibleFiles(convertedFiles, state.search)
    const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
    const allFolders =
      showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

    const { isFile, isFolder } = checkFile(folderPath)
    let result: FindFileResult = 'nonexistent'

    if (isFolder) {
      result = files.length < 1 ? 'no-workspaces' : 'ok'
    } else if (isFile) {
      result = 'is-file'
    }

    return {
      allFolders,
      closedFolders: [],
      configId,
      convertedFiles,
      depth,
      files,
      fileTree,
      folderName: folderName,
      folderPath,
      folderPathShort: folderPath.replace(homeDir, `~`),
      result,
      visibleFiles,
    }
  })

  state.result = 'ok'
  state.view = 'list'
}
