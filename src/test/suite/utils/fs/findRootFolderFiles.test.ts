import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import { findRootFolderFiles } from '../../../../utils/fs/findRootFolderFiles'
import { OS_HOMEFOLDER } from '../../../mocks/mockFileData'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

suite('Utils > Fs > findRootFolderFiles()', () => {
  const FOLDER = 'find-workspace-files'

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  test('invalid-folder object is returned if the folder is not a folder', () => {
    return findRootFolderFiles({
      excludedFolders: [],
      excludeHiddenFolders: true,
      folder: 'a.file',
      homeDir: OS_HOMEFOLDER,
      maxDepth: 1,
    }).then((wsFiles) => {
      expect(wsFiles).to.eql({ files: [], folderPath: 'a.file', result: 'invalid-folder' })
    })
  })

  test('no-workspaces object is returned if the folder contains no workspace files', () => {
    return findRootFolderFiles({
      excludedFolders: [],
      excludeHiddenFolders: true,
      folder: 'get-filenames-of-type',
      homeDir: OS_HOMEFOLDER,
      maxDepth: 1,
    }).then((wsFiles) => {
      expect(wsFiles).to.eql({
        files: [],
        folderPath: 'get-filenames-of-type',
        result: 'no-workspaces',
      })
    })
  })

  test('valid object is returned if the folder contains files of correct type', () => {
    return findRootFolderFiles({
      excludedFolders: [],
      excludeHiddenFolders: true,
      folder: FOLDER,
      homeDir: OS_HOMEFOLDER,
      maxDepth: 1,
    }).then((wsFiles) => {
      expect(wsFiles).to.eql({
        files: [
          path.join(FOLDER, 'WS 0.code-workspace'),
          path.join(FOLDER, 'test-subfolder1', 'WS 1.code-workspace'),
          path.join(FOLDER, 'test-subfolder2', 'WS 2.code-workspace'),
        ],
        folderPath: 'find-workspace-files',
        result: 'ok',
      })
    })
  })
})
