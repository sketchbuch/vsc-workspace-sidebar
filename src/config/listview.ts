import { workspace } from 'vscode'
import { ConfigShowPaths } from '../constants/config'

export const getShowPathsConfig = (): ConfigShowPaths => {
  return (
    workspace.getConfiguration().get<ConfigShowPaths>('workspaceSidebar.showPaths') ||
    ConfigShowPaths.NEVER
  )
}
