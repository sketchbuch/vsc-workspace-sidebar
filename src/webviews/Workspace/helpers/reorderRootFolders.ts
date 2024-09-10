import { Uuid, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

export const reorderRootFolders = (
  configId: Uuid,
  configIndex: number,
  rootFolder: WorkspaceStateRootFolder,
  rootFolders: WorkspaceStateRootFolder[]
): WorkspaceStateRootFolder[] => {
  if (rootFolders.length < 1) {
    return [rootFolder]
  }

  const curIndex = rootFolders.findIndex((rf) => rf.configId === configId)
  const newRootFolders = [...rootFolders.slice(0, curIndex), ...rootFolders.slice(curIndex + 1)]

  return [...newRootFolders.slice(0, configIndex), rootFolder, ...newRootFolders.slice(configIndex)]
}
