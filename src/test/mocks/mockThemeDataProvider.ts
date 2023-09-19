import { ThemeProcessor } from '../../themeNpm/ThemeProcessor'
import { ThemeProcessorObserver } from '../../themeNpm/ThemeProcessor.interface'
import { mockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => mockThemeData,
  subscribe: (observer: ThemeProcessorObserver) => {},
  unsubscribe: (observer: ThemeProcessorObserver) => {},
} as ThemeProcessor
