import { workspace } from 'vscode'
import { CONFIG_SEARCH_MINIMUM } from '../constants/config'

export const getSearchMinConfig = (): number => {
  return workspace.getConfiguration().get('workspaceSidebar.searchMinimum') ?? CONFIG_SEARCH_MINIMUM
}
