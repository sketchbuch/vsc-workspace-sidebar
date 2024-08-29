import { Uuid, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

export const reorderRootFolders = (
  configId: Uuid,
  newIndex: number,
  folder: WorkspaceStateRootFolder,
  curRootFolders: WorkspaceStateRootFolder[]
): WorkspaceStateRootFolder[] => {
  const curIndex = curRootFolders.findIndex((rf) => rf.configId === configId)
  const newRootFolders = [
    ...curRootFolders.slice(0, curIndex),
    ...curRootFolders.slice(curIndex + 1),
  ]

  return [...newRootFolders.slice(0, newIndex), folder, ...newRootFolders.slice(newIndex)]
}
