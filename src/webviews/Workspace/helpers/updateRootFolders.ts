import {
  ConfigRootFolder,
  Uuid,
  WorkspaceStateRootFolder,
} from '../WorkspaceViewProvider.interface'

type UpdateRootFoldersProps = {
  /**
   * The current settings.json rootFolders as returned by getFoldersConfig().
   */
  configFolders: ConfigRootFolder[]

  /**
   * The current rootFolders stored in state.
   */
  rootFolders: WorkspaceStateRootFolder[]
}

type UpdatedRootFolderExisting = {
  id: Uuid
  rootFolder: WorkspaceStateRootFolder
  status: 'same' | 'changed'
}

type UpdatedRootFolderNew = {
  id: Uuid
  status: 'new'
}

export type UpdatedRootFolder = UpdatedRootFolderExisting | UpdatedRootFolderNew

type UpdateRootFolders = (props: UpdateRootFoldersProps) => UpdatedRootFolder[]

/**
 * Make sure we respect config rootfolders
 * Remove non-existant rootFolders from state
 * Add new config rootFolders to state.
 * Reorder existing rootFolders.
 */
export const updateRootFolders: UpdateRootFolders = ({ configFolders, rootFolders }) => {
  if (configFolders.length < 1) {
    return []
  }

  const newRootFolders = configFolders.map<UpdatedRootFolder>((curConfigFolder) => {
    const existingFolder = rootFolders.find((rf) => rf.folderPathShort === curConfigFolder.path)

    if (existingFolder) {
      if (existingFolder.configId === curConfigFolder.id) {
        return { id: existingFolder.configId, rootFolder: existingFolder, status: 'same' }
      }

      return { id: curConfigFolder.id, rootFolder: existingFolder, status: 'changed' }
    }

    return { id: curConfigFolder.id, status: 'new' }
  }, [])

  return newRootFolders
}
