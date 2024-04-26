import { FS_WS_EXT } from '../../../constants/fs'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { cleanLabel } from '../../../utils/string/cleanLabel'

export const getLabel = (wsFile: string, clean: boolean): string => {
  const label = getLastPathSegment(wsFile).replace(FS_WS_EXT, '')

  return clean ? cleanLabel(label) : label
}
