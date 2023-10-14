import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import { WorkspaceFiles, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  /* state.files = action.payload
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : []

  if (state.files.length === 0) {
    state.hasFiles = false
    state.invalidReason = 'no-workspaces'
    state.isFolderInvalid = true
    state.rootFolders = []
    state.fileCount = 0
    state.visibleFileCount = 0
    state.state = 'invalid'
  }*/
  const showTree = getShowTreeConfig()
  let fileCount = 0
  let visibleFileCount = 0

  state.invalidReason = 'ok'
  state.isFolderInvalid = false
  state.state = 'list'

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const files = action.payload
    const convertedFiles = convertWsFiles(rootFolder.baseFolder, files, state.selected)
    const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
    const fileTree = showTree ? getFileTree(rootFolder.baseFolder, visibleFiles) : null
    const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      ...rootFolder,
      convertedFiles,
      files,
      fileTree,
      treeFolders,
      visibleFiles,
    }
  })

  state.fileCount = fileCount
  state.visibleFileCount = visibleFileCount
}
