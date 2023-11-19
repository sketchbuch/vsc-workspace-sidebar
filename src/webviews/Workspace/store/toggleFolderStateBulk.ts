import { PayloadAction } from '@reduxjs/toolkit'
import { PayloadToggleFolderStateBulk, WorkspaceState } from '../WorkspaceViewProvider.interface'

type RootFolderRef = string[]

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<PayloadToggleFolderStateBulk>
): void => {
  if (state.visibleFileCount < 1) {
    return
  }

  const { payload } = action
  const rootFoldersClosed: RootFolderRef = []
  const allSubFoldersClosed: RootFolderRef = []
  const someSubFoldersClosed: RootFolderRef = []

  state.rootFolders.forEach(({ closedFolders, folderPath, treeFolders }) => {
    const [root, ...subFolders] = treeFolders

    if (closedFolders.includes(root)) {
      rootFoldersClosed.push(folderPath)
    } else if (closedFolders.length === subFolders.length) {
      allSubFoldersClosed.push(folderPath)
    } else {
      someSubFoldersClosed.push(folderPath)
    }
  })

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const newFolder = { ...rootFolder }
    const { closedFolders, folderPath, treeFolders, visibleFiles } = rootFolder
    const [_, ...subFolders] = treeFolders

    if (payload === 'expand' && closedFolders.length) {
      if (rootFoldersClosed.includes(folderPath)) {
        newFolder.closedFolders = [...subFolders]
      } else if (allSubFoldersClosed.includes(folderPath)) {
        newFolder.closedFolders = []
      }
    } else if (payload === 'collapse' && visibleFiles.length && treeFolders.length > 0) {
      if (!rootFoldersClosed.includes(folderPath)) {
        if (allSubFoldersClosed.includes(folderPath) && someSubFoldersClosed.length < 1) {
          newFolder.closedFolders = [...treeFolders]
        } else {
          newFolder.closedFolders = [...subFolders]
        }
      }
    }

    return newFolder
  })
}
