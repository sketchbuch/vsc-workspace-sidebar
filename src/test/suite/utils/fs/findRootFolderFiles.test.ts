import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import { findRootFolderFiles } from '../../../../utils/fs/findRootFolderFiles'
import { FindRootFolderFilesConfig } from '../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { OS_HOMEFOLDER } from '../../../mocks/mockFileData'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

// MockFS seems broken
suite.skip('Utils > Fs > findRootFolderFiles()', () => {
  const FOLDER = 'find-workspace-files'

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  const getConfig = (testConfig: Partial<FindRootFolderFilesConfig>): FindRootFolderFilesConfig => {
    return {
      excludedFolders: [],
      excludeHiddenFolders: true,
      folder: '',
      homeDir: OS_HOMEFOLDER,
      maxDepth: 1,
      ...testConfig,
    }
  }

  test('If the folder does not exist, "nonexistent" is returned', () => {
    const testPath = path.join('nonexistent', 'folder')
    const config = getConfig({ folder: testPath })

    return findRootFolderFiles(config).then((wsFiles) => {
      expect(wsFiles).to.eql({
        depth: 1,
        files: [],
        folderPath: testPath,
        result: 'nonexistent',
      })
    })
  })

  test('If the folder is a file, "is-file" is returned', () => {
    const testPath = path.join('check-file', 'test-file.code-workspace')
    const config = getConfig({ folder: testPath })

    return findRootFolderFiles(config).then((wsFiles) => {
      expect(wsFiles).to.eql({
        depth: 1,
        files: [],
        folderPath: testPath,
        result: 'is-file',
      })
    })
  })

  test('If no workspaces are found, "no-workspaces" is returned', () => {
    const testPath = path.join('get-filenames-of-type')
    const config = getConfig({ folder: testPath })

    return findRootFolderFiles(config).then((wsFiles) => {
      expect(wsFiles).to.eql({
        depth: 1,
        files: [],
        folderPath: testPath,
        result: 'no-workspaces',
      })
    })
  })

  test('If workspaces are found, "ok" is returned', () => {
    const testPath = path.join(FOLDER)
    const config = getConfig({ folder: testPath })

    return findRootFolderFiles(config).then((wsFiles) => {
      expect(wsFiles).to.eql({
        depth: 1,
        files: [
          path.join(testPath, 'WS 0.code-workspace'),
          path.join(testPath, 'test-subfolder1', 'WS 1.code-workspace'),
          path.join(testPath, 'test-subfolder2', 'WS 2.code-workspace'),
        ],
        folderPath: 'find-workspace-files',
        result: 'ok',
      })
    })
  })
})
