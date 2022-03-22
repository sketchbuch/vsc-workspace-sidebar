/* import { FS_WS_FILETYPE as EXT } from '../../constants/fs';
import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File, Files } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

const FOLDERPATH1 = 'code';
const FILEPATH1 = `/home/user/dev/${FOLDERPATH1}/vscode/Vscode.${EXT}`;
const file1: File = {
  file: FILEPATH1,
  isSelected: false,
  label: 'Vscode',
  path: `${FOLDERPATH1}/vscode`,
  searchLabel: 'vscode',
  showPath: false,
};

const FOLDERPATH2 = 'code/vscode';
const FILEPATH2 = `/home/user/dev/${FOLDERPATH2}/some_ext/Some Extension.${EXT}`;
const file2: File = {
  file: FILEPATH2,
  isSelected: false,
  label: 'Some Extension',
  path: `${FOLDERPATH2}/some_ext`,
  searchLabel: 'some extension',
  showPath: false,
};

const FOLDERPATH3 = 'flutter';
const FILEPATH3 = `/home/user/dev/${FOLDERPATH3}/todo/Todo List.${EXT}`;
const file3: File = {
  file: FILEPATH3,
  isSelected: false,
  label: 'Todo List',
  path: `${FOLDERPATH3}/todo`,
  searchLabel: 'todo list',
  showPath: false,
};

const FOLDERPATH4 = 'react';
const FILEPATH4 = `/home/user/dev/${FOLDERPATH4}/router/React Router.${EXT}`;
const file4: File = {
  file: FILEPATH4,
  isSelected: false,
  label: 'React Router',
  path: `${FOLDERPATH4}/router`,
  searchLabel: 'react router',
  showPath: false,
};

export const mockFileList = [FILEPATH1, FILEPATH2, FILEPATH3, FILEPATH4];

export const mockFilesForFileTree: Files = [{ ...file1 }, { ...file2 }, { ...file3 }, { ...file4 }];

export const mockFileTree: FileTree = {
  code: {
    files: [{ ...file1 }],
    folderPath: FOLDERPATH1,
    sub: {
      vscode: {
        files: [{ ...file2 }],
        folderPath: FOLDERPATH2,
        sub: {},
      },
    },
  },
  flutter: {
    files: [{ ...file3 }],
    folderPath: FOLDERPATH3,
    sub: {},
  },
  react: {
    files: [{ ...file4 }],
    folderPath: FOLDERPATH4,
    sub: {},
  },
};

export const mockFileTreeNoFiles: FileTree = {
  code: {
    files: [],
    folderPath: FOLDERPATH1,
    sub: {
      vscode: {
        files: [],
        folderPath: FOLDERPATH2,
        sub: {},
      },
    },
  },
  flutter: {
    files: [],
    folderPath: FOLDERPATH3,
    sub: {},
  },
  react: {
    files: [],
    folderPath: FOLDERPATH4,
    sub: {},
  },
};

export const mockFileTreeFolders: string[] = [FOLDERPATH1, FOLDERPATH2, FOLDERPATH3, FOLDERPATH4];
 */
