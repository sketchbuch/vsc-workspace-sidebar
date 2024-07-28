import { PayloadAction } from '@reduxjs/toolkit'
import { PayloadToggleFolderStateBulk, WorkspaceState } from '../WorkspaceViewProvider.interface'

type RootFolderRef = string[]

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<PayloadToggleFolderStateBulk>
): void => {
  const { payload } = action
  const rootFoldersClosed: RootFolderRef = []
  const allSubFoldersClosed: RootFolderRef = []
  const someSubFoldersClosed: RootFolderRef = []

  state.rootFolders.forEach(({ allFolders, closedFolders, folderPath }) => {
    const [root, ...subFolders] = allFolders

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
    const { allFolders, closedFolders, folderPath, visibleFiles } = rootFolder
    const [_, ...subFolders] = allFolders

    if (payload === 'expand' && closedFolders.length > 0) {
      if (rootFoldersClosed.includes(folderPath)) {
        newFolder.closedFolders = [...subFolders]
      } else if (
        allSubFoldersClosed.includes(folderPath) ||
        someSubFoldersClosed.includes(folderPath)
      ) {
        newFolder.closedFolders = []
      }
    } else if (payload === 'collapse' && visibleFiles.length && allFolders.length > 0) {
      if (!rootFoldersClosed.includes(folderPath)) {
        if (allSubFoldersClosed.includes(folderPath) && someSubFoldersClosed.length < 1) {
          newFolder.closedFolders = [...allFolders]
        } else {
          newFolder.closedFolders = [...subFolders]
        }
      }
    }

    return newFolder
  })
}
