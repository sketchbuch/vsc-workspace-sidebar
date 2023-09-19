import { ThemeProcessor } from '../../themeNpm/ThemeProcessor'
import { ThemeProcessorObserver } from '../../themeNpm/ThemeProcessor.interface'
import { getMockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => getMockThemeData(),
  subscribe: (observer: ThemeProcessorObserver) => {},
  unsubscribe: (observer: ThemeProcessorObserver) => {},
} as ThemeProcessor
