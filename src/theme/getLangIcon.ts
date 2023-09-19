import * as path from 'path'
import { FileIconKeys } from '../webviews/webviews.interface'
import { checkCustomSegments } from './checkCustomSegments'
import { checkThemeSegments } from './checkThemeSegments'
import { getNameSegments, getPathSegments } from './getFileSegments'

export const getLangIcon = (file: string, fileIconKeys: FileIconKeys): string => {
  const { custom, fileExtensions, languageIds } = fileIconKeys
  const { dir, name } = path.parse(file)
  let fallback = fileIconKeys.file ? 'file' : ''

  const nameSegments = getNameSegments(name)
  const pathSegments = getPathSegments(dir)

  if (fileExtensions) {
    fallback = fileExtensions.find((iconKey) => iconKey === 'workspace') ?? fallback
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
  }

  if (languageIds) {
    fallback = languageIds.find((iconKey) => iconKey === 'workspace') ?? fallback
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
  }

  return fallback
}
