import { ThemeDataProcessor } from '../../theme/ThemeDataProcessor'
import { ThemeCacheData } from '../../theme/ThemeDataProcessor.interface'
import { Observer } from '../../types/observerable'

export const mockThemeDataProvider = {
  deleteThemeData: () => {},
  getThemeData: () => null,
  setThemeData: (data: ThemeCacheData) => {},
  subscribe: (observer: Observer) => {},
  unsubscribe: (observer: Observer) => {},
} as ThemeDataProcessor
