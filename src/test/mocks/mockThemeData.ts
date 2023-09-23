import { GetThemeData } from 'vscode-file-theme-processor'
import { DEFAULT_THEME } from '../../theme/constants'

export const getMockThemeData = (testData: Partial<GetThemeData> = {}): GetThemeData => {
  return {
    data: {
      file: 'file',
      fileExtensions: { ts: 'file' },
      fileNames: {},
      folder: 'folder',
      folderExpanded: 'folder',
      folderNamesExpanded: {},
      fonts: [],
      hidesExplorerArrows: false,
      iconDefinitions: {},
      languageIds: { typescript: 'file' },
      rootFolder: 'folder',
      rootFolderExpanded: 'folder',
      showLanguageModeIcons: false,
    },
    localResourceRoots: [],
    state: 'ready',
    themeId: DEFAULT_THEME,
    ...testData,
  }
}
