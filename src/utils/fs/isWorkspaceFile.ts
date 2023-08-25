import { FS_WS_FILETYPE } from '../../constants/fs'
import { getLastPathSegment } from './getLastPathSegment'

export const isWorkspaceFile = (path: string, scheme: string) => {
  if (scheme === 'file') {
    const fileName = getLastPathSegment(path)
    const ext = fileName.substring(fileName.lastIndexOf('.') + 1)

    if (ext && ext === FS_WS_FILETYPE) {
      return true
    }
  }

  return false
}
