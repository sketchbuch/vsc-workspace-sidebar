import path from 'path'

export interface ConfigureFolder {
  name: string
  parent: string | null
  path: string
}

export type ConfigureFolderStructure = ConfigureFolder[]

export const getConfigFolderStructure = (
  newFolders: string[],
  configFolders: string[]
): ConfigureFolderStructure => {
  const structure: ConfigureFolderStructure = []

  for (let cf = 0; cf < configFolders.length; cf++) {
    const folder = configFolders[cf]
    const pathSegments = folder.split(path.sep)
    let lastPath = ''

    for (let ps = 0; ps < pathSegments.length; ps++) {
      const isRoot = ps === 0
      const segment = pathSegments[ps]
      lastPath = isRoot ? segment : path.join(lastPath, segment)

      if (!structure.find((ele) => ele.path === lastPath)) {
        structure.push({
          name: segment,
          parent: isRoot ? null : pathSegments[ps - 1],
          path: lastPath,
        })
      }
    }
  }

  structure

  console.log('### structure', structure)

  return structure
}
