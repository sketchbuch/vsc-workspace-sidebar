import { ThemeDataProcessor } from '../../theme/ThemeProcessor'
import { ThemeCacheData } from '../../theme/ThemeProcessor.interface'
import { Observer } from '../../types/observerable'

export const mockThemeDataProvider = {
  deleteThemeData: () => {},
  getThemeData: () => null,
  setThemeData: (data: ThemeCacheData) => {},
  subscribe: (observer: Observer) => {},
  unsubscribe: (observer: Observer) => {},
} as ThemeDataProcessor
