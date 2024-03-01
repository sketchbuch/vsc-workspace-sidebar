import * as path from 'path'

export const getDescription = (descriptionPath: string, crop: boolean) => {
  if (crop) {
    const [_, ...subParts] = descriptionPath.split(path.sep)

    if (subParts.length > 0) {
      return path.join(...subParts)
    }
  }

  return descriptionPath
}
