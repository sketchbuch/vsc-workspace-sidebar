import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setFileTree = (state: WorkspaceState): void => {
  state.fileTree = getFileTree(state.visibleFiles)
  state.treeFolders = state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : []
}
