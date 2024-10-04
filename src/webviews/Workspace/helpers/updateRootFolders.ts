import { getInitialRootFolder } from '../store/initialStates'
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

export type UpdatedRootFolder = {
  configFolder: ConfigRootFolder
  id: Uuid
  rootFolder: WorkspaceStateRootFolder
  status: 'changed' | 'new' | 'same'
}

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

  return configFolders.map<UpdatedRootFolder>((curConfigFolder) => {
    const rootFolder = rootFolders.find((rf) => rf.folderPathShort === curConfigFolder.path)

    if (rootFolder) {
      return {
        configFolder: curConfigFolder,
        id: curConfigFolder.id,
        rootFolder,
        status: rootFolder.configId === curConfigFolder.id ? 'same' : 'changed',
      }
    }

    return {
      configFolder: curConfigFolder,
      id: curConfigFolder.id,
      rootFolder: getInitialRootFolder(curConfigFolder),
      status: 'new',
    }
  }, [])
}
