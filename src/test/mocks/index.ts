import * as path from 'path';

export const extensionPath = path.resolve(`${__dirname}/../../..`);

export const mockFsStructure = {
  'get-filenames-of-type': {
    'test-file.txt': '',
    'test-file2.jpg': '',
    'test-file3': '',
    'test-subfolder1': {},
    'test-subfolder2': {},
  },
  'check-file': {
    'test-file.txt': '',
  },
  'find-workspace-files': {
    'WS 0.code-workspace': '',
    'test-subfolder1': {
      'WS 1.code-workspace': '',
    },
    'test-subfolder2': {
      'WS 2.code-workspace': '',
    },
  },
};
