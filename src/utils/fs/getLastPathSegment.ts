import * as pathLib from 'path'

export const getLastPathSegment = (path: string): string => {
  const lastSlashIndex = path.lastIndexOf(pathLib.sep)

  return path.substring(lastSlashIndex + 1)
}
