import * as path from 'path'

export const getNameSegments = (nameToSegment: string): string[] => {
  return (
    nameToSegment
      .toLowerCase()
      // Normalise keyword seperators
      .replace(' ', '.')
      .replace('_', '.')
      .replace('-', '.')
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
