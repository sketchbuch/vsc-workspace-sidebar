import * as os from 'os'
import * as pathLib from 'path'
import { getExplorerCompactFoldersConfig } from '../../../config/core'
import { getCondenseFileTreeConfig } from '../../../config/treeview'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { FileTree, Files, FolderList } from '../WorkspaceViewProvider.interface'
import { compactTree } from './compactTree'
import { condenseTree } from './condenseTree'

export const getFileTree = (configFolder: string, files: Files): FileTree => {
  const homeDir = os.homedir()
  const condense = getCondenseFileTreeConfig()
  const compact = getExplorerCompactFoldersConfig()
  const rootFolder = getLastPathSegment(configFolder)

  let tree: FileTree = {
    compactedFolders: [],
    files: [],
    folderPath: configFolder.replace(`~`, homeDir),
    folderPathSegment: rootFolder,
    isRoot: true,
    label: rootFolder || configFolder,
    sub: [],
  }

  const folderList: FolderList = {}
  const rootFiles = tree.files
  const rootBranch = tree.sub
  let branch: FileTree[] = rootBranch

  files.forEach((file) => {
    const { path } = file
    const parts = path.split(pathLib.sep)
    let folderPathSegment = ''

    if (parts.length === 1 && !file.path) {
      // Workspace files in the config folder root, not in subfolders
      rootFiles.push({ ...file })
    } else {
      while (parts.length) {
        let part = parts.shift()

        if (part) {
          folderPathSegment = folderPathSegment ? `${folderPathSegment}${pathLib.sep}${part}` : part

          const dirName = pathLib.dirname(file.file)
          let searchStr = `${pathLib.sep}${part}${pathLib.sep}`
          let lastIndex = dirName.lastIndexOf(searchStr)
          let cropPos = lastIndex + searchStr.length - 1

          // Folder, not found, check without last sep
          if (lastIndex < 0) {
            searchStr = `${pathLib.sep}${part}`
            lastIndex = dirName.lastIndexOf(searchStr)
            cropPos = lastIndex + searchStr.length
          }

          // Either the existing folder, or a new one
          const folder: FileTree = folderList[folderPathSegment] ?? {
            compactedFolders: [],
            files: [],
            folderPath: file.file.substring(0, cropPos),
            folderPathSegment,
            isRoot: false,
            label: part,
            sub: [],
          }

          if (folderList[folderPathSegment] === undefined) {
            folderList[folderPathSegment] = folder // Reference for future iterations
            branch.push(folder)
          }

          if (parts.length) {
            branch = folder.sub
          } else {
            folder.files.push({ ...file })
            branch = rootBranch
          }
        }
      }
    }
  })

  if (condense === true) {
    tree = condenseTree(tree)
  }

  if (compact === true) {
    tree = compactTree(tree)
  }

  return tree
}
