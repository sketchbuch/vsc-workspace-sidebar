import * as os from 'os'
import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  ConfigRootFolder,
  SearchState,
  WorkspaceState,
  WorkspaceStateRootFolder,
} from '../WorkspaceViewProvider.interface'
import { getWsType } from '../helpers/getWsType'

export const initialSearchState: SearchState = {
  caseInsensitive: false,
  matchStart: false,
  term: '',
}

export const getInitialRootFolder = ({
  id,
  depth,
  path,
}: ConfigRootFolder): WorkspaceStateRootFolder => {
  const homeDir = os.homedir()
  const folderName = getLastPathSegment(path) || path

  return {
    allFolders: [],
    closedFolders: [],
    configId: id,
    convertedFiles: [],
    depth,
    files: [],
    fileTree: null,
    folderName: folderName,
    folderPath: path.replace(`~`, homeDir),
    folderPathShort: path.replace(homeDir, `~`),
    result: 'loading',
    visibleFiles: [],
  }
}

export const getInitialRootFolders = (
  configFolders: ConfigRootFolder[]
): WorkspaceStateRootFolder[] => {
  if (configFolders.length > 0) {
    return configFolders.map<WorkspaceStateRootFolder>((cf) => getInitialRootFolder(cf))
  }

  return []
}

export const initialState: WorkspaceState = {
  error: '',
  errorObj: null,
  result: 'ok',
  rootFolders: getInitialRootFolders(getFoldersConfig()),
  search: { ...initialSearchState },
  selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
  view: 'loading',
  wsType: getWsType(vscode.workspace.workspaceFile, vscode.workspace.workspaceFolders),
}
