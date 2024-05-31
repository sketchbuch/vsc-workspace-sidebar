import { CONFIG_DEPTH } from '../../constants/config'
import { getLastPathSegment } from '../../utils/fs/getLastPathSegment'
import { initialSearchState, initialState } from '../../webviews/Workspace/store/workspaceSlice'
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

type GetMockRootFolders = Pick<WorkspaceState, 'fileCount' | 'rootFolders' | 'visibleFileCount'>

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
  let fileCount = 0
  let visibleFileCount = 0

  const rootFolders = rootFoldersFiles.map(({ files, folderPath, result }) => {
    const convertedFiles = getMockConvertedFiles()
    const visibleFiles = getMockVisibleFiles(searchTerm, !showTree)
    const fileTree = showTree ? getMockFileTree(fileTreeType) : null
    const allFolders: string[] = showTree ? getMockFolderList(fileTreeType) : [ROOT_FOLDER]

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      allFolders,
      closedFolders,
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
    fileCount,
    rootFolders,
    visibleFileCount,
  }
}
