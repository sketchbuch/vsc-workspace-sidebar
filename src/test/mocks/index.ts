export * from './mockContext';
export * from './mockExtensionUri';
export * from './mockFiles';
export * from './mockRenderVars';
export * from './mockState';
export * from './mockTemplateVars';
export * from './mockWebview';

export const mockFsStructure = {
  'check-file': {
    'test-file.txt': '',
  },
  'collect-files-from-folder': {
    'file-1.txt': '',
    'file-6.gif': '',
    'test-subfolder1': {
      'file-2.txt': '',
      'file-4.png': '',
      'file-5.md': '',
    },
    'test-subfolder2': {
      'file-3.txt': '',
      'file-4.jpg': '',
      'file-7.txt': '',
    },
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
  'get-filenames-of-type': {
    'test-file.txt': '',
    'test-file2.jpg': '',
    'test-file3': '',
    'test-subfolder1': {},
    'test-subfolder2': {},
  },
};
