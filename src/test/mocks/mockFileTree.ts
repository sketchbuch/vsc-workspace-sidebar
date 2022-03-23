import { FS_WS_FILETYPE as EXT } from '../../constants/fs';
import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

// TODO - Make getters and optimse (src/test/suite/webviews/Workspace/store/reducers.test.ts)
// TODO - Replace mockFiles.ts with files from here

export const ROOT_FOLDER = 'dev';
export const ROOT_TREE = `/home/user/${ROOT_FOLDER}`;

const FOLDER1 = 'code';
export const file1: File = {
  file: `${ROOT_TREE}/${FOLDER1}/vscode/Vscode.${EXT}`,
  isSelected: false,
  label: 'Vscode',
  path: `${FOLDER1}/vscode`,
  searchLabel: 'vscode',
  showPath: false,
};

const FOLDER2 = 'code/vscode';
export const file2: File = {
  file: `${ROOT_TREE}/${FOLDER2}/some_ext/Some Extension.${EXT}`,
  isSelected: false,
  label: 'Some Extension',
  path: `${FOLDER2}/some_ext`,
  searchLabel: 'some extension',
  showPath: false,
};

const FOLDER3 = 'flutter';
export const file3: File = {
  file: `${ROOT_TREE}/${FOLDER3}/todo/Todo List.${EXT}`,
  isSelected: false,
  label: 'Todo List',
  path: `${FOLDER3}/todo`,
  searchLabel: 'todo list',
  showPath: false,
};

const FOLDER4 = 'react';
export const file4: File = {
  file: `${ROOT_TREE}/${FOLDER4}/router/React Router.${EXT}`,
  isSelected: false,
  label: 'React Router',
  path: `${FOLDER4}/router`,
  searchLabel: 'react router',
  showPath: false,
};

export const mockFileList = [file1.file, file2.file, file3.file, file4.file];
export const mockFolderList: string[] = [ROOT_FOLDER, FOLDER1, FOLDER2, FOLDER3, FOLDER4];
export const mockConvertedFiles: Files = [
  { ...file1, showPath: true },
  { ...file2, showPath: true },
  { ...file3, showPath: true },
  { ...file4, showPath: true },
];
export const mockVisibleFiles: Files = [{ ...file1 }, { ...file2 }, { ...file3 }, { ...file4 }];

export const mockFileTree: FileTree = {
  files: [],
  folderPath: ROOT_FOLDER,
  label: ROOT_FOLDER,
  sub: [
    {
      files: [{ ...file1 }],
      folderPath: FOLDER1,
      label: FOLDER1,
      sub: [
        {
          files: [{ ...file2 }],
          folderPath: FOLDER2,
          label: 'vscode',
          sub: [],
        },
      ],
    },
    {
      files: [{ ...file3 }],
      folderPath: FOLDER3,
      label: FOLDER3,
      sub: [],
    },
    {
      files: [{ ...file4 }],
      folderPath: FOLDER4,
      label: FOLDER4,
      sub: [],
    },
  ],
};

export const SEARCH_TERM = 'react';
export const mockFileTreeSearched: FileTree = {
  files: [],
  folderPath: ROOT_FOLDER,
  label: ROOT_FOLDER,
  sub: [
    {
      files: [{ ...file4 }],
      folderPath: FOLDER4,
      label: FOLDER4,
      sub: [],
    },
  ],
};
