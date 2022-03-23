import { FS_WS_FILETYPE as EXT } from '../../constants/fs';
import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const ROOT_FOLDER = 'dev';
export const ROOT_TREE = `/home/user/${ROOT_FOLDER}`;

export const FOLDER1 = 'code';
export const file1: File = {
  file: `${ROOT_TREE}/${FOLDER1}/vscode/Vscode.${EXT}`,
  isSelected: false,
  label: 'Vscode',
  path: `${FOLDER1}/vscode`,
  searchLabel: 'vscode',
  showPath: true,
};

const FOLDER2 = 'code/vscode';
export const file2: File = {
  file: `${ROOT_TREE}/${FOLDER2}/some_ext/Some Extension.${EXT}`,
  isSelected: false,
  label: 'Some Extension',
  path: `${FOLDER2}/some_ext`,
  searchLabel: 'some extension',
  showPath: true,
};

const FOLDER3 = 'flutter';
export const file3: File = {
  file: `${ROOT_TREE}/${FOLDER3}/todo/Todo List.${EXT}`,
  isSelected: false,
  label: 'Todo List',
  path: `${FOLDER3}/todo`,
  searchLabel: 'todo list',
  showPath: true,
};

const FOLDER4 = 'react';
export const file4: File = {
  file: `${ROOT_TREE}/${FOLDER4}/router/React Router.${EXT}`,
  isSelected: false,
  label: 'React Router',
  path: `${FOLDER4}/router`,
  searchLabel: 'react router',
  showPath: true,
};

export const mockFileList = [file1.file, file2.file, file3.file, file4.file];
export const mockFolderList: string[] = [ROOT_FOLDER, FOLDER1, FOLDER2, FOLDER3, FOLDER4];
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
  label: ROOT_FOLDER,
  sub: [
    {
      files: [{ ...mockVisibleFiles[0] }],
      folderPath: FOLDER1,
      label: FOLDER1,
      sub: [
        {
          files: [{ ...mockVisibleFiles[1] }],
          folderPath: FOLDER2,
          label: 'vscode',
          sub: [],
        },
      ],
    },
    {
      files: [{ ...mockVisibleFiles[2] }],
      folderPath: FOLDER3,
      label: FOLDER3,
      sub: [],
    },
    {
      files: [{ ...mockVisibleFiles[3] }],
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
      files: [{ ...mockVisibleFiles[3] }],
      folderPath: FOLDER4,
      label: FOLDER4,
      sub: [],
    },
  ],
};
