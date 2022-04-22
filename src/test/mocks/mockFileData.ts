import { FS_WS_FILETYPE as EXT } from '../../constants/fs';
import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type GetFileTreeType = 'condensed' | 'condensed-searched' | 'normal' | 'searched';
type SortDir = 'asc' | 'desc';

export const ROOT_FOLDER = 'dev';
export const ROOT_FOLDER_PATH = `/home/user/${ROOT_FOLDER}`;
export const SEARCH_TERM = 'react';

export const FOLDER1 = 'code';
export const SUBFOLDER1 = 'vscode';
export const file1: File = {
  file: `${ROOT_FOLDER_PATH}/${FOLDER1}/${SUBFOLDER1}/Vscode.${EXT}`,
  isSelected: false,
  label: 'Vscode',
  path: `${FOLDER1}/${SUBFOLDER1}`,
  searchLabel: 'vscode',
  showPath: true,
};

export const FOLDER2 = 'code/vscode';
export const SUBFOLDER2 = 'some_ext';
export const file2: File = {
  file: `${ROOT_FOLDER_PATH}/${FOLDER2}/${SUBFOLDER2}/Some Extension.${EXT}`,
  isSelected: false,
  label: 'Some Extension',
  path: `${FOLDER2}/${SUBFOLDER2}`,
  searchLabel: 'some extension',
  showPath: true,
};

export const FOLDER3 = 'flutter';
export const SUBFOLDER3 = 'todo';
export const file3: File = {
  file: `${ROOT_FOLDER_PATH}/${FOLDER3}/${SUBFOLDER3}/Todo List.${EXT}`,
  isSelected: false,
  label: 'Todo List',
  path: `${FOLDER3}/${SUBFOLDER3}`,
  searchLabel: 'todo list',
  showPath: true,
};

export const FOLDER4 = 'react';
export const SUBFOLDER4 = 'router';
export const file4: File = {
  file: `${ROOT_FOLDER_PATH}/${FOLDER4}/${SUBFOLDER4}/React Router.${EXT}`,
  isSelected: false,
  label: 'React Router',
  path: `${FOLDER4}/${SUBFOLDER4}`,
  searchLabel: 'react router',
  showPath: true,
};

export const getMockFileList = () => [file1.file, file2.file, file3.file, file4.file];

export const getMockFolderList = (type: GetFileTreeType): string[] => {
  switch (type) {
    case 'condensed':
      return [FOLDER1, FOLDER2, FOLDER3, FOLDER4];

    case 'condensed-searched':
      return [FOLDER4];

    case 'searched':
      return [FOLDER4, file4.path];

    default:
      return [FOLDER1, FOLDER2, file2.path, FOLDER3, file3.path, FOLDER4, file4.path];
  }
};

export const getMockVisibleFiles = (sortDir?: SortDir): Files => {
  const sortedFiles = [
    { ...file4, showPath: false },
    { ...file2, showPath: false },
    { ...file3, showPath: false },
    { ...file1, showPath: false },
  ];

  if (sortDir === 'asc') {
    return sortedFiles;
  } else if (sortDir === 'desc') {
    return sortedFiles.reverse();
  }

  return [
    { ...file1, showPath: false },
    { ...file2, showPath: false },
    { ...file3, showPath: false },
    { ...file4, showPath: false },
  ];
};

export const getMockConvertedFiles = (sortDir?: SortDir): Files => {
  const sortedFiles = [{ ...file4 }, { ...file2 }, { ...file3 }, { ...file1 }];

  if (sortDir === 'asc') {
    return sortedFiles;
  } else if (sortDir === 'desc') {
    return sortedFiles.reverse();
  }

  return [{ ...file1 }, { ...file2 }, { ...file3 }, { ...file4 }];
};

export const getMockFileTree = (type: GetFileTreeType): FileTree => {
  switch (type) {
    case 'condensed':
      return {
        files: [],
        folderPath: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        searchLabel: ROOT_FOLDER.toLowerCase(),
        sub: [
          {
            files: [],
            folderPath: FOLDER1,
            isRoot: false,
            label: FOLDER1,
            searchLabel: FOLDER1.toLowerCase(),
            sub: [
              {
                files: [{ ...getMockVisibleFiles()[0] }, { ...getMockVisibleFiles()[1] }],
                folderPath: file1.path,
                isRoot: false,
                label: SUBFOLDER1,
                searchLabel: SUBFOLDER1.toLowerCase(),
                sub: [],
              },
            ],
          },
          {
            files: [{ ...getMockVisibleFiles()[2] }],
            folderPath: FOLDER3,
            isRoot: false,
            label: FOLDER3,
            searchLabel: FOLDER3.toLowerCase(),
            sub: [],
          },
          {
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            searchLabel: FOLDER4.toLowerCase(),
            sub: [],
          },
        ],
      };

    case 'condensed-searched':
      return {
        files: [],
        folderPath: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        searchLabel: ROOT_FOLDER.toLowerCase(),
        sub: [
          {
            files: [{ ...getMockVisibleFiles()[3] }],
            folderPath: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            searchLabel: FOLDER4.toLowerCase(),
            sub: [],
          },
        ],
      };

    case 'searched':
      return {
        files: [],
        folderPath: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        searchLabel: ROOT_FOLDER.toLowerCase(),
        sub: [
          {
            files: [],
            folderPath: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            searchLabel: FOLDER4.toLowerCase(),
            sub: [
              {
                files: [{ ...getMockVisibleFiles()[3] }],
                folderPath: file4.path,
                isRoot: false,
                label: SUBFOLDER4,
                searchLabel: SUBFOLDER4.toLowerCase(),
                sub: [],
              },
            ],
          },
        ],
      };

    default:
      return {
        files: [],
        folderPath: ROOT_FOLDER,
        isRoot: true,
        label: ROOT_FOLDER,
        searchLabel: ROOT_FOLDER.toLowerCase(),
        sub: [
          {
            files: [],
            folderPath: FOLDER1,
            isRoot: false,
            label: FOLDER1,
            searchLabel: FOLDER1.toLowerCase(),
            sub: [
              {
                files: [{ ...getMockVisibleFiles()[0] }],
                folderPath: file1.path,
                isRoot: false,
                label: SUBFOLDER1,
                searchLabel: SUBFOLDER1.toLowerCase(),
                sub: [
                  {
                    files: [{ ...getMockVisibleFiles()[1] }],
                    folderPath: file2.path,
                    isRoot: false,
                    label: SUBFOLDER2,
                    searchLabel: SUBFOLDER2.toLowerCase(),
                    sub: [],
                  },
                ],
              },
            ],
          },
          {
            files: [],
            folderPath: FOLDER3,
            isRoot: false,
            label: FOLDER3,
            searchLabel: FOLDER3.toLowerCase(),
            sub: [
              {
                files: [{ ...getMockVisibleFiles()[2] }],
                folderPath: file3.path,
                isRoot: false,
                label: SUBFOLDER3,
                searchLabel: SUBFOLDER3.toLowerCase(),
                sub: [],
              },
            ],
          },
          {
            files: [],
            folderPath: FOLDER4,
            isRoot: false,
            label: FOLDER4,
            searchLabel: FOLDER4.toLowerCase(),
            sub: [
              {
                files: [{ ...getMockVisibleFiles()[3] }],
                folderPath: file4.path,
                isRoot: false,
                label: SUBFOLDER4,
                searchLabel: SUBFOLDER4.toLowerCase(),
                sub: [],
              },
            ],
          },
        ],
      };
  }
};