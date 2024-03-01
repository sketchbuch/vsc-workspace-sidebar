import { File, FileTree } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

type TreeChild = FileTree | File
export type TreeChildren = TreeChild[]

export const sortTreeChildren = (childen: TreeChildren): TreeChildren => {
  if (childen.length > 1) {
    return childen.sort((a, b) => {
      if (a && b) {
        if (a.label > b.label) {
          return 1
        } else if (a.label < b.label) {
          return -1
        }
      }

      return 0
    })
  }

  return childen
}
