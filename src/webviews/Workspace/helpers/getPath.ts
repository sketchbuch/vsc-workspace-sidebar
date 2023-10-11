import * as pathLib from 'path'
import { isWindows } from '../../../utils/os/isWindows'

export const getPath = (wsFile: string, configFolder: string, osHomeDir: string): string => {
  const cleanedFolder = configFolder.replace(osHomeDir, '~')
  const lastSlashIndex = wsFile.lastIndexOf(pathLib.sep)

  const slashRegex = isWindows() ? /^\\/ : /^\//

  return wsFile
    .substring(0, lastSlashIndex)
    .replace(osHomeDir, '~')
    .replace(cleanedFolder, '')
    .replace(slashRegex, '') // Remove leading slash if there is one
}
