import { workspace } from 'vscode'
import { ConfigShowPaths } from '../constants/config'

export const getShowPathsConfig = (): ConfigShowPaths => {
  return workspace.getConfiguration().get('workspaceSidebar.showPaths') || ConfigShowPaths.NEVER
}
