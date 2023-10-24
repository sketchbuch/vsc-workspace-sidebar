import { workspace } from 'vscode'
import {
  CONFIG_SEARCH_CASE_INSENSITIVE,
  CONFIG_SEARCH_MATCH_START,
  CONFIG_SEARCH_MINIMUM,
} from '../constants/config'

export const getSearchCaseInsensitiveConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.search.caseInsensitive') ??
    CONFIG_SEARCH_CASE_INSENSITIVE
  )
}

export const getSearchMatchStartConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.search.matchStart') ??
    CONFIG_SEARCH_MATCH_START
  )
}

export const getSearchMinConfig = (): number => {
  return (
    workspace.getConfiguration().get<number>('workspaceSidebar.searchMinimum') ??
    CONFIG_SEARCH_MINIMUM
  )
}
