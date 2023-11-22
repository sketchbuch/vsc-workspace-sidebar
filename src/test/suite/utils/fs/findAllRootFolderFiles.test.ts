import { expect } from 'chai'
import * as sinon from 'sinon'
import * as foldersConfigs from '../../../../config/folders'
import * as collect from '../../../../utils/fs/collectFilesFromFolder'
import { findAllRootFolderFiles } from '../../../../utils/fs/findAllRootFolderFiles'
import * as finder from '../../../../utils/fs/findRootFolderFiles'
import { ROOT_FOLDER_PATH } from '../../../mocks/mockFileData'

suite('Utils > Fs > findAllRootFolderFiles()', async () => {
  let collectFilesStub: sinon.SinonStub
  let findRootFolderFilesStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub

  setup(() => {
    collectFilesStub = sinon
      .stub(collect, 'collectFilesFromFolder')
      .callsFake(async () => Promise.resolve([]))
    findRootFolderFilesStub = sinon
      .stub(finder, 'findRootFolderFiles')
      .callsFake(async (folder: string) => {
        const response: finder.FindRootFolderFiles = {
          files: [],
          folderPath: '',
          result: 'invalid-folder',
        }

        return Promise.resolve(response)
      })
    folderConfigStub = sinon
      .stub(foldersConfigs, 'getFoldersConfig')
      .callsFake(() => [ROOT_FOLDER_PATH])
  })

  teardown(() => {
    collectFilesStub.restore()
    findRootFolderFilesStub.restore()
    folderConfigStub.restore()
  })

  test('No root folders returns expected result', async () => {
    folderConfigStub.callsFake(() => [])

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
