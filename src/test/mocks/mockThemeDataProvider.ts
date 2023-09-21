import { FileThemeProcessor } from '../../themeNpm/FileThemeProcessor'
import { FileThemeProcessorObserver } from '../../themeNpm/FileThemeProcessor.interface'
import { getMockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => getMockThemeData(),
  subscribe: (observer: FileThemeProcessorObserver) => {},
  unsubscribe: (observer: FileThemeProcessorObserver) => {},
} as FileThemeProcessor
