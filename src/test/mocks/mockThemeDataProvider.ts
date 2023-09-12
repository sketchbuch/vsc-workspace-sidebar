import { ThemeProcessor } from '../../theme/ThemeProcessor'
import { ThemeCacheData, ThemeProcessorObserver } from '../../theme/ThemeProcessor.interface'

export const mockThemeDataProvider = {
  deleteThemeData: () => {},
  getThemeData: () => null,
  setThemeData: (data: ThemeCacheData) => {},
  subscribe: (observer: ThemeProcessorObserver) => {},
  unsubscribe: (observer: ThemeProcessorObserver) => {},
} as ThemeProcessor
