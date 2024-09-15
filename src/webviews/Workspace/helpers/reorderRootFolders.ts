import { Uuid, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

type ReorderRootFoldersProps = {
  /**
   * The ID of the config rootFolder being reordered.
   */
  configId: Uuid

  /**
   * The index of the config rootFolder being reordered.
   */
  configIndex: number

  /**
   * The current rootFolder from state being reordered.
   */
  rootFolder: WorkspaceStateRootFolder

  /**
   * The current rootFolders stored in state.
   */
  rootFolders: WorkspaceStateRootFolder[]
}

type ReorderRootFolders = (props: ReorderRootFoldersProps) => WorkspaceStateRootFolder[]

export const reorderRootFolders: ReorderRootFolders = ({
  configId,
  configIndex,
  rootFolder,
  rootFolders,
}): WorkspaceStateRootFolder[] => {
  if (rootFolders.length < 1) {
    return [rootFolder]
  }

  const curIndex = rootFolders.findIndex((rf) => rf.configId === configId)
  const newRootFolders = [...rootFolders.slice(0, curIndex), ...rootFolders.slice(curIndex + 1)]

  return [...newRootFolders.slice(0, configIndex), rootFolder, ...newRootFolders.slice(configIndex)]
}
