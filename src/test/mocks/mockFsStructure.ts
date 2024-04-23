export const mockFsStructure = {
  'check-file': {
    'test-file.code-workspace': '',
  },
  'collect-files-from-folder': {
    'file-1.code-workspace': '',
    'file-6.gif': '',
    'test-subfolder1': {
      'file-2.code-workspace': '',
      'file-4.png': '',
      'file-5.md': '',
    },
    'test-subfolder2': {
      'file-3.code-workspace': '',
      'file-4.jpg': '',
      'file-7.code-workspace': '',
    },
    'hidden-last-folder': {
      '.hiddenfolder': {
        'hiddenfolder.code-workspace': '',
      },
    },
    'hidden-sub-folder': {
      '.hiddenfolder': {
        'sub-folder': {
          'hiddensubfolder.code-workspace': '',
        },
      },
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
    'no-workspaces': {
      'file-5.md': '',
    },
    'no-workspaces2': {
      'file-4.md': '',
    },
  },
  'find-workspace-files-more-workspaces': {
    'more-sub': {
      'WS 7.code-workspace': '',
    },
  },
  'get-filenames-of-type': {
    'test-file.txt': '',
    'test-file2.jpg': '',
    'test-file3': '',
    'test-subfolder1': {},
    'test-subfolder2': {},
  },
}
