import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import * as sinon from 'sinon'
import * as generalConfigs from '../../../../config/general'
import { FS_WS_FILETYPE } from '../../../../constants/fs'
import * as utils from '../../../../utils/fs/collectFilesFromFolder'
import { findRootFolderFiles } from '../../../../utils/fs/findRootFolderFiles'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

suite('Utils > Fs > findRootFolderFiles()', () => {
  const FOLDER = 'find-workspace-files'

  let configDepthStub: sinon.SinonStub

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  setup(() => {
    configDepthStub = sinon.stub(generalConfigs, 'getDepthConfig').callsFake(() => 1)
  })

  teardown(() => {
    configDepthStub.restore()
  })

  test('invalid-folder object is returned if the folder is not a folder', () => {
    return findRootFolderFiles('a.file').then((wsFiles) => {
      expect(wsFiles).to.eql({ files: [], folderPath: 'a.file', result: 'invalid-folder' })
    })
  })

  test('no-workspaces object is returned if the folder contains no workspace files', () => {
    return findRootFolderFiles('get-filenames-of-type').then((wsFiles) => {
      expect(wsFiles).to.eql({
        files: [],
        folderPath: 'get-filenames-of-type',
        result: 'no-workspaces',
      })
    })
  })

  test('valid object is returned if the folder contains files of correct type', () => {
    const collectSpy = sinon.spy(utils, 'collectFilesFromFolder')

    return findRootFolderFiles(FOLDER).then((wsFiles) => {
      expect(wsFiles).to.eql({
        files: [
          path.join(FOLDER, 'WS 0.code-workspace'),
          path.join(FOLDER, 'test-subfolder1', 'WS 1.code-workspace'),
          path.join(FOLDER, 'test-subfolder2', 'WS 2.code-workspace'),
        ],
        folderPath: 'find-workspace-files',
        result: 'ok',
      })

      sinon.assert.callCount(collectSpy, 3) // Initial + 2 subfolders
      sinon.assert.calledWith(collectSpy, FOLDER, FS_WS_FILETYPE, 1, 0)
      sinon.assert.calledWith(
        collectSpy,
        path.join(FOLDER, 'test-subfolder1'),
        FS_WS_FILETYPE,
        1,
        1
      )
      sinon.assert.calledWith(
        collectSpy,
        path.join(FOLDER, 'test-subfolder2'),
        FS_WS_FILETYPE,
        1,
        1
      )

      collectSpy.restore()
    })
  })
})
