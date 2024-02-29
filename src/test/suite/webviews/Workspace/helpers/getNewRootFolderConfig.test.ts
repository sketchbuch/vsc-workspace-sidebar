import { expect } from 'chai'
import * as path from 'path'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import * as foldersConfigs from '../../../../../config/folders'
import { CONFIG_DEPTH } from '../../../../../constants/config'
import { isWindows } from '../../../../../utils/os/isWindows'
import { getNewRootFolderConfig } from '../../../../../webviews/Workspace/helpers/getNewRootFolderConfig'
import { OS_HOMEFOLDER, OS_HOMEFOLDER_WIN } from '../../../../mocks/mockFileData'

suite('Config > Helpers > getNewRootFolderConfig():', function () {
  const isWin = isWindows()

  const getPath = (folder: string): string => {
    if (isWin) {
      return path.join(OS_HOMEFOLDER_WIN, folder)
    }

    return `${path.sep}${path.join(OS_HOMEFOLDER, folder)}`
  }

  const defaultPaths = [
    { path: getPath('Dev'), depth: CONFIG_DEPTH },
    { path: getPath('Public'), depth: CONFIG_DEPTH },
    { path: getPath('Temp'), depth: CONFIG_DEPTH },
  ]

  let foldersConfigStub: sinon.SinonStub

  setup(() => {
    foldersConfigStub = sinon.stub(foldersConfigs, 'getFoldersConfig').callsFake(() => defaultPaths)
  })

  teardown(() => {
    foldersConfigStub.restore()
  })

  test('New folders are added', () => {
    const filePath = getPath('Pictures')
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Pictures',
        uri: vscode.Uri.file(filePath),
      },
    ])

    expect(result).to.eql([
      isWin ? filePath.charAt(0).toLowerCase() + filePath.slice(1) : filePath,
      ...defaultPaths,
    ])
  })
})
