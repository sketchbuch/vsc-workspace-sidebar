import { FindRootFolderFiles } from '../../utils/fs/findRootFolderFiles'
import { getLastPathSegment } from '../../utils/fs/getLastPathSegment'
import { initialSearchState, initialState } from '../../webviews/Workspace/store/workspaceSlice'
import {
  SearchState,
  WorkspaceState,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  OS_HOMEFOLDER,
  ROOT_FOLDER_PATH,
} from './mockFileData'

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    ...initialState,
    selected: '',
    wsType: 'ws',
    ...state,
  }
}

export const getMockSearchState = (state: Partial<SearchState> = {}): SearchState => {
  return {
    ...initialSearchState,
    ...state,
  }
}

const defaultRootFolderFiles: FindRootFolderFiles[] = [
  { files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
]

export const getMockRootFolders = (
  rootFoldersFiles: FindRootFolderFiles[] = defaultRootFolderFiles
): Pick<WorkspaceState, 'fileCount' | 'rootFolders' | 'visibleFileCount'> => {
  let fileCount = 0
  let visibleFileCount = 0

  const rootFolders = rootFoldersFiles.map(({ files, folderPath, result }) => {
    const convertedFiles = getMockConvertedFiles()
    const visibleFiles = getMockVisibleFiles()
    const fileTree = getMockFileTree('normal')
    const treeFolders: string[] = getMockFolderList('normal')

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      closedFolders: [],
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
