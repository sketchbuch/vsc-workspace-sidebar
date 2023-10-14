import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import { WorkspaceFiles, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { convertWsFilesNew } from '../helpers/convertWsFilesNew'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getFileTreeNew } from '../helpers/getFileTreeNew'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  state.files = action.payload
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : []

  if (state.files.length === 0) {
    state.fileTree = null
    state.invalidReason = 'no-workspaces'
    state.isFolderInvalid = true
    state.rootFolders = []
    state.state = 'invalid'
    state.treeFolders = []
    state.visibleFiles = []
  } else {
    const showTree = getShowTreeConfig()

    state.invalidReason = 'ok'
    state.isFolderInvalid = false
    state.state = 'list'
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort)
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : []

    state.rootFolders = state.rootFolders.map((rootFolder) => {
      const files = action.payload
      const convertedFiles = convertWsFilesNew(rootFolder.baseFolder, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
      const fileTree = showTree ? getFileTreeNew(rootFolder.baseFolder, visibleFiles) : null
      const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

      return {
        ...rootFolder,
        convertedFiles,
        files,
        fileTree,
        treeFolders,
        visibleFiles,
      }
    })
  }
}
