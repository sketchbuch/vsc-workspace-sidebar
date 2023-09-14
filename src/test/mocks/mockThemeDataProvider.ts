import { ThemeProcessor } from '../../theme/ThemeProcessor'
import { ThemeProcessorObserver } from '../../theme/ThemeProcessor.interface'
import { mockThemeData } from './mockThemeData'

export const mockThemeDataProvider = {
  getThemeData: () => mockThemeData,
  subscribe: (observer: ThemeProcessorObserver) => {},
  unsubscribe: (observer: ThemeProcessorObserver) => {},
} as ThemeProcessor
