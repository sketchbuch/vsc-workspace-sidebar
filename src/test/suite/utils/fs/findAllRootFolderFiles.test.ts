import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as folders from '../../../../config/folders'
import { CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../constants/config'
import * as collect from '../../../../utils/fs/collectFilesFromFolder'
import { findAllRootFolderFiles } from '../../../../utils/fs/findAllRootFolderFiles'
import * as finder from '../../../../utils/fs/findRootFolderFiles'
import { FindRootFolderFilesConfig } from '../../../../utils/fs/findRootFolderFiles'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH } from '../../../mocks/mockFileData'

suite.only('Utils > Fs > findAllRootFolderFiles()', async () => {
  let collectFilesStub: sinon.SinonStub
  let excludedFoldersConfigStub: sinon.SinonStub
  let findRootFolderFilesStub: sinon.SinonStub
  let foldersConfigStub: sinon.SinonStub
  let hiddenFoldersConfigStub: sinon.SinonStub
  let osStub: sinon.SinonStub

  setup(() => {
    collectFilesStub = sinon
      .stub(collect, 'collectFilesFromFolder')
      .callsFake(async () => Promise.resolve([]))
    excludedFoldersConfigStub = sinon.stub(folders, 'getExcludedFoldersConfig').callsFake(() => [])
    findRootFolderFilesStub = sinon
      .stub(finder, 'findRootFolderFiles')
      .callsFake(async (config: FindRootFolderFilesConfig) => {
        const response: finder.FindRootFolderFiles = {
          files: [],
          folderPath: '',
          result: 'invalid-folder',
        }

        return Promise.resolve(response)
      })
    foldersConfigStub = sinon.stub(folders, 'getFoldersConfig').callsFake(() => [ROOT_FOLDER_PATH])
    hiddenFoldersConfigStub = sinon
      .stub(folders, 'getExcludeHiddenFoldersConfig')
      .callsFake(() => CONFIG_EXCLUDE_HIDDEN_FODLERS)
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    collectFilesStub.restore()
    excludedFoldersConfigStub.restore()
    findRootFolderFilesStub.restore()
    foldersConfigStub.restore()
    hiddenFoldersConfigStub.restore()
    osStub.restore()
  })

  test('No root folders returns expected result', async () => {
    foldersConfigStub.callsFake(() => [])

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({ rootFolders: [], result: 'no-root-folders' })
  })

  test('Invalid folders returns expected result', async () => {
    const result = await findAllRootFolderFiles()
    expect(result).to.eql({ rootFolders: [], result: 'invalid-folder' })
  })

  test('No workspaces returns expected result', async () => {
    findRootFolderFilesStub.callsFake(async (folder: string) => {
      const response: finder.FindRootFolderFiles = {
        files: [],
        folderPath: '',
        result: 'no-workspaces',
      }

      return Promise.resolve(response)
    })

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({ rootFolders: [], result: 'no-workspaces' })
  })

  test('Valid folders returns expected result', async () => {
    findRootFolderFilesStub.callsFake(async (folder: string) => {
      const response: finder.FindRootFolderFiles = {
        files: [],
        folderPath: '',
        result: 'ok',
      }

      return Promise.resolve(response)
    })

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({
      rootFolders: [
        {
          files: [],
          folderPath: '',
          result: 'ok',
        },
      ],
      result: 'ok',
    })
  })
})
