import { FindRootFolderFiles } from '../../utils/fs/findRootFolderFiles'
import { getLastPathSegment } from '../../utils/fs/getLastPathSegment'
import { initialSearchState, initialState } from '../../webviews/Workspace/store/workspaceSlice'
import {
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
  ROOT_FOLDER_PATH,
  SortDir,
} from './mockFileData'

type GetMockRootFolders = Pick<WorkspaceState, 'fileCount' | 'rootFolders' | 'visibleFileCount'>

type GetMockRootFoldersConfig = {
  closedFolders: string[]
  fileTreeType: GetFileTreeType
  rootFoldersFiles: FindRootFolderFiles[]
  searchTerm: string
  showTree: boolean
  sortConverted: SortDir | undefined
  sortVsible: SortDir | undefined
}

export const defaultRootFolderFiles: FindRootFolderFiles[] = [
  { files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
]

const defaultGetMockRootFoldersConfig: GetMockRootFoldersConfig = {
  closedFolders: [],
  fileTreeType: 'normal',
  rootFoldersFiles: defaultRootFolderFiles,
  searchTerm: '',
  showTree: false,
  sortConverted: undefined,
  sortVsible: undefined,
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
  const {
    closedFolders,
    fileTreeType,
    rootFoldersFiles,
    searchTerm,
    showTree,
    sortConverted,
    sortVsible,
  } = {
    ...defaultGetMockRootFoldersConfig,
    ...config,
  }
  let fileCount = 0
  let visibleFileCount = 0

  const rootFolders = rootFoldersFiles.map(({ files, folderPath, result }) => {
    const convertedFiles = getMockConvertedFiles(sortConverted)
    const visibleFiles = getMockVisibleFiles(sortVsible, searchTerm)
    const fileTree = showTree ? getMockFileTree(fileTreeType) : null
    const treeFolders: string[] = showTree ? getMockFolderList(fileTreeType) : []

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      closedFolders,
      convertedFiles,
      files,
      fileTree,
      folderName: getLastPathSegment(folderPath),
      folderPath,
      folderPathShort: folderPath.replace(OS_HOMEFOLDER, `~`),
      result,
      treeFolders,
      visibleFiles,
    }
  })

  return {
    fileCount,
    rootFolders,
    visibleFileCount,
  }
}
