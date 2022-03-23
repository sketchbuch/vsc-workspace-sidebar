import { FS_WS_FILETYPE as EXT } from '../../constants/fs';
import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const ROOT_FOLDER = 'dev';
export const ROOT_TREE = `/home/user/${ROOT_FOLDER}`;

export const FOLDER1 = 'code';
const SUBFOLDER1 = 'vscode';
export const file1: File = {
  file: `${ROOT_TREE}/${FOLDER1}/${SUBFOLDER1}/Vscode.${EXT}`,
  isSelected: false,
  label: 'Vscode',
  path: `${FOLDER1}/${SUBFOLDER1}`,
  searchLabel: 'vscode',
  showPath: true,
};

const FOLDER2 = 'code/vscode';
const SUBFOLDER2 = 'some_ext';
export const file2: File = {
  file: `${ROOT_TREE}/${FOLDER2}/${SUBFOLDER2}/Some Extension.${EXT}`,
  isSelected: false,
  label: 'Some Extension',
  path: `${FOLDER2}/${SUBFOLDER2}`,
  searchLabel: 'some extension',
  showPath: true,
};

const FOLDER3 = 'flutter';
const SUBFOLDER3 = 'todo';
export const file3: File = {
  file: `${ROOT_TREE}/${FOLDER3}/${SUBFOLDER3}/Todo List.${EXT}`,
  isSelected: false,
  label: 'Todo List',
  path: `${FOLDER3}/${SUBFOLDER3}`,
  searchLabel: 'todo list',
  showPath: true,
};

const FOLDER4 = 'react';
const SUBFOLDER4 = 'router';
export const file4: File = {
  file: `${ROOT_TREE}/${FOLDER4}/${SUBFOLDER4}/React Router.${EXT}`,
  isSelected: false,
  label: 'React Router',
  path: `${FOLDER4}/${SUBFOLDER4}`,
  searchLabel: 'react router',
  showPath: true,
};

export const mockFileList = [file1.file, file2.file, file3.file, file4.file];
export const mockFolderList: string[] = [
  ROOT_FOLDER,
  FOLDER1,
  FOLDER2,
  `${FOLDER2}/${SUBFOLDER2}`,
  FOLDER3,
  `${FOLDER3}/${SUBFOLDER3}`,
  FOLDER4,
  `${FOLDER4}/${SUBFOLDER4}`,
];
export const mockConvertedFiles: Files = [{ ...file1 }, { ...file2 }, { ...file3 }, { ...file4 }];
export const mockVisibleFiles: Files = [
  { ...file1, showPath: false },
  { ...file2, showPath: false },
  { ...file3, showPath: false },
  { ...file4, showPath: false },
];
export const mockConvertedFilesAsc: Files = [
  { ...mockConvertedFiles[3] },
  { ...mockConvertedFiles[1] },
  { ...mockConvertedFiles[2] },
  { ...mockConvertedFiles[0] },
];
export const mockConvertedFilesDesc: Files = [...mockConvertedFilesAsc].reverse();

export const mockFileTree: FileTree = {
  files: [],
  folderPath: ROOT_FOLDER,
  isRoot: true,
  label: ROOT_FOLDER,
  sub: [
    {
      files: [],
      folderPath: FOLDER1,
      isRoot: false,
      label: FOLDER1,
      sub: [
        {
          files: [{ ...mockVisibleFiles[0] }],
          folderPath: file1.path,
          isRoot: false,
          label: SUBFOLDER1,
          sub: [
            {
              files: [{ ...mockVisibleFiles[1] }],
              folderPath: file2.path,
              isRoot: false,
              label: SUBFOLDER2,
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
      sub: [
        {
          files: [{ ...mockVisibleFiles[2] }],
          folderPath: file3.path,
          isRoot: false,
          label: SUBFOLDER3,
          sub: [],
        },
      ],
    },
    {
      files: [],
      folderPath: FOLDER4,
      isRoot: false,
      label: FOLDER4,
      sub: [
        {
          files: [{ ...mockVisibleFiles[3] }],
          folderPath: file4.path,
          isRoot: false,
          label: SUBFOLDER4,
          sub: [],
        },
      ],
    },
  ],
};

export const SEARCH_TERM = 'react';
export const mockFileTreeSearched: FileTree = {
  files: [],
  folderPath: ROOT_FOLDER,
  isRoot: true,
  label: ROOT_FOLDER,
  sub: [
    {
      files: [],
      folderPath: FOLDER4,
      isRoot: false,
      label: FOLDER4,
      sub: [
        {
          files: [{ ...mockVisibleFiles[3] }],
          folderPath: file4.path,
          isRoot: false,
          label: SUBFOLDER4,
          sub: [],
        },
      ],
    },
  ],
};
