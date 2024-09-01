import { CONFIG_DEPTH } from '../../constants/config'
import { getLastPathSegment } from '../../utils/fs/getLastPathSegment'
import { initialSearchState, initialState } from '../../webviews/Workspace/store/initialStates'
import {
  FindRootFolderFiles,
  SearchState,
  WorkspaceState,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  GetFileTreeType,
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  OS_HOMEFOLDER,
  ROOT_FOLDER,
  ROOT_FOLDER_PATH,
} from './mockFileData'

type GetMockRootFolders = Pick<WorkspaceState, 'rootFolders'>

type GetMockRootFoldersConfig = {
  closedFolders: string[]
  fileTreeType: GetFileTreeType
  rootFoldersFiles: FindRootFolderFiles[]
  searchTerm: string
  showTree: boolean
}

export const defaultRootFolderFiles: FindRootFolderFiles[] = [
  { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
]

const defaultGetMockRootFoldersConfig: GetMockRootFoldersConfig = {
  closedFolders: [],
  fileTreeType: 'normal',
  rootFoldersFiles: defaultRootFolderFiles,
  searchTerm: '',
  showTree: false,
}

export const getMockSearchState = (state: Partial<SearchState> = {}): SearchState => {
  return {
    ...initialSearchState,
    ...state,
  }
}

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    ...initialState,
    rootFolders: [],
    selected: '',
    wsType: 'ws',
    ...state,
  }
}

export const getMockRootFolders = (
  config: Partial<GetMockRootFoldersConfig> = {}
): GetMockRootFolders => {
  const { closedFolders, fileTreeType, rootFoldersFiles, searchTerm, showTree } = {
    ...defaultGetMockRootFoldersConfig,
    ...config,
  }

  const rootFolders = rootFoldersFiles.map(({ files, folderPath, result }, index) => {
    const convertedFiles = getMockConvertedFiles()
    const visibleFiles = getMockVisibleFiles(searchTerm, !showTree)
    const fileTree = showTree ? getMockFileTree(fileTreeType) : null
    const allFolders: string[] = showTree ? getMockFolderList(fileTreeType) : [ROOT_FOLDER]

    return {
      allFolders,
      closedFolders,
      configId: `root-folder-${index + 1}`,
      convertedFiles,
      depth: CONFIG_DEPTH,
      files,
      fileTree,
      folderName: getLastPathSegment(folderPath) || folderPath,
      folderPath,
      folderPathShort: folderPath.replace(OS_HOMEFOLDER, `~`),
      result,
      visibleFiles,
    }
  })

  return {
    rootFolders,
  }
}
