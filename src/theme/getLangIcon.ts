import * as path from 'path'
import { FileIconKeys } from '../webviews/webviews.interface'
import { checkCustomSegments } from './checkCustomSegments'
import { checkThemeSegments } from './checkThemeSegments'
import { FILE_ICON, WORKSPACE_ICON } from './constants'
import { getNameSegments, getPathSegments } from './getFileSegments'

export const getLangIcon = (file: string, fileIconKeys: FileIconKeys): string => {
  const { custom, fileExtensions, languageIds } = fileIconKeys
  const { dir, name } = path.parse(file)
  let fallback = fileIconKeys.file ? FILE_ICON : ''

  const nameSegments = getNameSegments(name)
  const pathSegments = getPathSegments(dir)

  if (fileExtensions) {
    const segmentMatch = checkThemeSegments(nameSegments, pathSegments, fileExtensions)

    if (segmentMatch) {
      return segmentMatch
    }

    if (custom) {
      const customMatch = checkCustomSegments(custom, nameSegments, pathSegments, fileExtensions)

      if (customMatch) {
        return customMatch
      }
    }

    fallback = fileExtensions.find((iconKey) => iconKey === WORKSPACE_ICON) ?? fallback
  }

  if (languageIds) {
    const segmentMatch = checkThemeSegments(nameSegments, pathSegments, languageIds)

    if (segmentMatch) {
      return segmentMatch
    }

    if (custom) {
      const customMatch = checkCustomSegments(custom, nameSegments, pathSegments, languageIds)

      if (customMatch) {
        return customMatch
      }
    }

    fallback = languageIds.find((iconKey) => iconKey === WORKSPACE_ICON) ?? fallback
  }

  return fallback
}
