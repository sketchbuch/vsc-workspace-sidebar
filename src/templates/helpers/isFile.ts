import { File, FileTree } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

export const isFile = (item: File | FileTree): item is File => {
  return (item as File).file !== undefined
}
