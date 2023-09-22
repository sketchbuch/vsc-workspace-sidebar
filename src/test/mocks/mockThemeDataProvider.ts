import { FileThemeProcessor } from '../../themeNpm/FileThemeProcessor/FileThemeProcessor'
import { FileThemeProcessorObserver } from '../../themeNpm/FileThemeProcessor/FileThemeProcessor.interface'
import { getMockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => getMockThemeData(),
  subscribe: (observer: FileThemeProcessorObserver) => {},
  unsubscribe: (observer: FileThemeProcessorObserver) => {},
} as FileThemeProcessor
