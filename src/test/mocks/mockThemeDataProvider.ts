import { FileThemeProcessor, FileThemeProcessorObserver } from 'vscode-file-theme-processor'
import { getMockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => getMockThemeData(),
  subscribe: (observer: FileThemeProcessorObserver) => {},
  unsubscribe: (observer: FileThemeProcessorObserver) => {},
} as FileThemeProcessor
