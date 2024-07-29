import { FindFileResult, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

export type GetFolderCounts = {
  fileCount: number
  visibleFileCount: number
}

export const getFolderCounts = (
  rootFolders: WorkspaceStateRootFolder[],
  resultsToInore: FindFileResult[] = []
) => {
  return rootFolders.reduce<GetFolderCounts>(
    (counts, { files, visibleFiles, result }) => {
      if (!resultsToInore.includes(result)) {
        return {
          fileCount: counts.fileCount + files.length,
          visibleFileCount: counts.visibleFileCount + visibleFiles.length,
        }
      }

      return counts
    },
    { fileCount: 0, visibleFileCount: 0 }
  )
}
