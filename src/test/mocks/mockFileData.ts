import * as path from 'path'
import { FS_WS_FILETYPE as EXT } from '../../constants/fs'
import { File, FileTree, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

export type GetFileTreeType =
  | 'compacted-condensed-searched'
  | 'compacted-condensed'
  | 'compacted-searched'
  | 'compacted'
  | 'condensed-searched'
  | 'condensed'
  | 'normal'
  | 'searched'

export const OS_HOMEFOLDER_WIN = 'C:\\User\\User'

export const OS_HOMEFOLDER = path.join('home', 'user')
export const ROOT_FOLDER = 'dev'
export const ROOT_FOLDER_USERPATH = path.join('~', ROOT_FOLDER)
export const ROOT_FOLDER_PATH = path.join(OS_HOMEFOLDER, ROOT_FOLDER)
export const SEARCH_TERM = 'React'
export const SEARCH_TERM_LOWERCASE = 'react'

export const LABEL1 = 'Vscode'
export const FOLDER1 = 'code'
export const SUBFOLDER1 = 'vscode'
export const file1: File = {
  cleanedLabel: LABEL1,
  file: path.join(ROOT_FOLDER_PATH, FOLDER1, SUBFOLDER1, `${LABEL1}.${EXT}`),
  isSelected: false,
  label: LABEL1,
  path: path.join(FOLDER1, SUBFOLDER1),
  showPath: true,
}

export const LABEL2 = 'Some Extension'
export const FOLDER2 = path.join('code', 'vscode')
export const SUBFOLDER2 = 'some_ext'
export const file2: File = {
  cleanedLabel: LABEL2,
  file: path.join(ROOT_FOLDER_PATH, FOLDER2, SUBFOLDER2, `${LABEL2}.${EXT}`),
  isSelected: false,
  label: LABEL2,
  path: path.join(FOLDER2, SUBFOLDER2),
  showPath: true,
}

export const LABEL3 = 'Todo List'
export const FOLDER3 = 'flutter'
export const SUBFOLDER3 = 'todo'
export const file3: File = {
  cleanedLabel: LABEL3,
  file: path.join(ROOT_FOLDER_PATH, FOLDER3, SUBFOLDER3, `${LABEL3}.${EXT}`),
  isSelected: false,
  label: LABEL3,
  path: path.join(FOLDER3, SUBFOLDER3),
  showPath: true,
}

export const LABEL4 = 'React Router'
export const FOLDER4 = 'react'
export const SUBFOLDER4 = 'router'
export const file4: File = {
  cleanedLabel: LABEL4,
  file: path.join(ROOT_FOLDER_PATH, FOLDER4, SUBFOLDER4, `${LABEL4}.${EXT}`),
  isSelected: false,
  label: LABEL4,
  path: path.join(FOLDER4, SUBFOLDER4),
  showPath: true,
}

export const getMockFileList = () => [file1.file, file2.file, file3.file, file4.file]

export const getMockFolderList = (type: GetFileTreeType): string[] => {
  switch (type) {
    case 'compacted-condensed':
      return [ROOT_FOLDER, FOLDER2, FOLDER3, FOLDER4]

    case 'compacted':
      return [ROOT_FOLDER, FOLDER2, file2.path, file3.path, file4.path]

    case 'condensed':
      return [ROOT_FOLDER, FOLDER1, FOLDER2, FOLDER3, FOLDER4]

    case 'compacted-searched':
      return [ROOT_FOLDER, file4.path]

    case 'compacted-condensed-searched':
    case 'condensed-searched':
      return [ROOT_FOLDER, FOLDER4]

    case 'searched':
      return [ROOT_FOLDER, FOLDER4, file4.path]

    case 'normal':
    default:
      return [ROOT_FOLDER, FOLDER1, FOLDER2, file2.path, FOLDER3, file3.path, FOLDER4, file4.path]
  }
}

export const getMockVisibleFiles = (term: string = '', sort: boolean = false): Files => {
  let files = [
    { ...file1, showPath: false },
    { ...file2, showPath: false },
    { ...file3, showPath: false },
    { ...file4, showPath: false },
  ]

  if (sort) {
    files = [
      { ...file4, showPath: false },
      { ...file2, showPath: false },
      { ...file3, showPath: false },
      { ...file1, showPath: false },
    ]
  }

  if (term) {
    const lcTerm = term.toLowerCase()
    files = files.filter((file) => file.label.toLowerCase().includes(lcTerm))
  }

  return files
}

export const getMockConvertedFiles = (): Files => {
  return [{ ...file1 }, { ...file2 }, { ...file3 }, { ...file4 }]
}

export const getMockFileTree = (type: GetFileTreeType): FileTree => {
  switch (type) {
    case 'condensed':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [],
            files: [],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER1),
            folderPathSegment: FOLDER1,
            isRoot: false,
            label: FOLDER1,
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[0] }, { ...getMockVisibleFiles()[1] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
                folderPathSegment: file1.path,
                isRoot: false,
                label: SUBFOLDER1,
                sub: [],
              },
            ],
          },
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[2] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER3),
            folderPathSegment: FOLDER3,
            isRoot: false,
            label: FOLDER3,
            sub: [],
          },
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [],
          },
        ],
      }

    case 'condensed-searched':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [],
          },
        ],
      }

    case 'compacted-searched':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [
              {
                folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
                folderPathSegment: FOLDER4,
                label: FOLDER4,
              },
              {
                folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
                folderPathSegment: file4.path,
                label: SUBFOLDER4,
              },
            ],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
            folderPathSegment: file4.path,
            isRoot: false,
            label: path.join(FOLDER4, SUBFOLDER4),
            sub: [],
          },
        ],
      }

    case 'searched':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [],
            files: [],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[3] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
                folderPathSegment: file4.path,
                isRoot: false,
                label: SUBFOLDER4,
                sub: [],
              },
            ],
          },
        ],
      }

    case 'compacted':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [
              {
                folderPath: path.join(ROOT_FOLDER_PATH, FOLDER1),
                folderPathSegment: FOLDER1,
                label: FOLDER1,
              },
              {
                folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
                folderPathSegment: file1.path,
                label: SUBFOLDER1,
              },
            ],
            files: [{ ...getMockVisibleFiles()[0] }],
            folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
            folderPathSegment: file1.path,
            isRoot: false,
            label: path.join(FOLDER1, SUBFOLDER1),
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[1] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file2.path),
                folderPathSegment: file2.path,
                isRoot: false,
                label: SUBFOLDER2,
                sub: [],
              },
            ],
          },
          {
            compactedFolders: [
              {
                folderPath: path.join(ROOT_FOLDER_PATH, FOLDER3),
                folderPathSegment: FOLDER3,
                label: FOLDER3,
              },
              {
                folderPath: path.join(ROOT_FOLDER_PATH, file3.path),
                folderPathSegment: file3.path,
                label: SUBFOLDER3,
              },
            ],
            files: [{ ...getMockVisibleFiles()[2] }],
            folderPath: path.join(ROOT_FOLDER_PATH, file3.path),
            folderPathSegment: file3.path,
            isRoot: false,
            label: path.join(FOLDER3, SUBFOLDER3),
            sub: [],
          },
          {
            compactedFolders: [
              {
                folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
                folderPathSegment: FOLDER4,
                label: FOLDER4,
              },
              {
                folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
                folderPathSegment: file4.path,
                label: SUBFOLDER4,
              },
            ],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
            folderPathSegment: file4.path,
            isRoot: false,
            label: path.join(FOLDER4, SUBFOLDER4),
            sub: [],
          },
        ],
      }

    case 'compacted-condensed-searched':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [],
          },
        ],
      }

    case 'compacted-condensed':
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [
              {
                folderPath: path.join(ROOT_FOLDER_PATH, FOLDER1),
                folderPathSegment: FOLDER1,
                label: FOLDER1,
              },
              {
                folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
                folderPathSegment: file1.path,
                label: SUBFOLDER1,
              },
            ],
            files: [{ ...getMockVisibleFiles()[0] }, { ...getMockVisibleFiles()[1] }],
            folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
            folderPathSegment: file1.path,
            isRoot: false,
            label: path.join(FOLDER1, SUBFOLDER1),
            sub: [],
          },
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[2] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER3),
            folderPathSegment: FOLDER3,
            isRoot: false,
            label: FOLDER3,
            sub: [],
          },
          {
            compactedFolders: [],
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [],
          },
        ],
      }

    case 'normal':
    default:
      return {
        compactedFolders: [],
        files: [],
        folderPath: ROOT_FOLDER_PATH,
        folderPathSegment: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        sub: [
          {
            compactedFolders: [],
            files: [],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER1),
            folderPathSegment: FOLDER1,
            isRoot: false,
            label: FOLDER1,
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[0] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file1.path),
                folderPathSegment: file1.path,
                isRoot: false,
                label: SUBFOLDER1,
                sub: [
                  {
                    compactedFolders: [],
                    files: [{ ...getMockVisibleFiles()[1] }],
                    folderPath: path.join(ROOT_FOLDER_PATH, file2.path),
                    folderPathSegment: file2.path,
                    isRoot: false,
                    label: SUBFOLDER2,
                    sub: [],
                  },
                ],
              },
            ],
          },
          {
            compactedFolders: [],
            files: [],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER3),
            folderPathSegment: FOLDER3,
            isRoot: false,
            label: FOLDER3,
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[2] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file3.path),
                folderPathSegment: file3.path,
                isRoot: false,
                label: SUBFOLDER3,
                sub: [],
              },
            ],
          },
          {
            compactedFolders: [],
            files: [],
            folderPath: path.join(ROOT_FOLDER_PATH, FOLDER4),
            folderPathSegment: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            sub: [
              {
                compactedFolders: [],
                files: [{ ...getMockVisibleFiles()[3] }],
                folderPath: path.join(ROOT_FOLDER_PATH, file4.path),
                folderPathSegment: file4.path,
                isRoot: false,
                label: SUBFOLDER4,
                sub: [],
              },
            ],
          },
        ],
      }
  }
}
