import { expect } from 'chai'
import * as path from 'path'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import * as foldersConfigs from '../../../../../config/folders'
import { getNewRootFolderConfig } from '../../../../../webviews/Workspace/helpers/getNewRootFolderConfig'
import { OS_HOMEFOLDER } from '../../../../mocks/mockFileData'

suite('Config > Helpers > getNewRootFolderConfig():', function () {
  const defaultPaths = [
    `${path.sep}${path.join(OS_HOMEFOLDER, 'Dev')}`,
    `${path.sep}${path.join(OS_HOMEFOLDER, 'Public')}`,
    `${path.sep}${path.join(OS_HOMEFOLDER, 'Temp')}`,
  ]
  let foldersConfigStub: sinon.SinonStub

  setup(() => {
    foldersConfigStub = sinon.stub(foldersConfigs, 'getFoldersConfig').callsFake(() => defaultPaths)
  })

  teardown(() => {
    foldersConfigStub.restore()
  })

  test('New folders are added', () => {
    const filePath = `${path.sep}${path.join(OS_HOMEFOLDER, 'Pictures')}`
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Pictures',
        uri: vscode.Uri.file(filePath),
      },
    ])

    expect(result).to.eql([filePath, ...defaultPaths])
  })
})
