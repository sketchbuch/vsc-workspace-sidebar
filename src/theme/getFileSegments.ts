import * as path from 'path'

export const getNameSegments = (nameToSegment: string): string[] => {
  return (
    nameToSegment
      .toLowerCase()
      // Normalise keyword seperators
      .replace(/ /g, '.')
      .replace(/_/g, '.')
      .replace(/-/g, '.')
      .split('.')
  )
}

export const getPathSegments = (pathToSegment: string): string[] => {
  return pathToSegment
    .toLowerCase()
    .split(path.sep)
    .filter((seg) => seg)
    .reverse() // Prioritise deepest folders
}
