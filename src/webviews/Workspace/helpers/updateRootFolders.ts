import { ConfigRootFolder, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

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

type UpdateRootFolders = (props: UpdateRootFoldersProps) => WorkspaceStateRootFolder[]

export const updateRootFolders: UpdateRootFolders = ({ configFolders, rootFolders }) => {
  return []
}
