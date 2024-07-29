import * as pathLib from 'path'
import { FS_SLASH_REGEX } from '../../../constants/fs'

export const getPath = (wsFile: string, configFolder: string, osHomeDir: string): string => {
  const cleanedFolder = configFolder.replace(osHomeDir, '~')
  const lastSlashIndex = wsFile.lastIndexOf(pathLib.sep)

  return wsFile
    .substring(0, lastSlashIndex)
    .replace(osHomeDir, '~')
    .replace(cleanedFolder, '')
    .replace(FS_SLASH_REGEX, '') // Remove leading slash if there is one
}
