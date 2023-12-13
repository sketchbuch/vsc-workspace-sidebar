import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import * as foldersConfigs from '../../../../../config/folders'
import * as windows from '../../../../../utils/os/isWindows'
import { getNewRootFolderConfig } from '../../../../../webviews/Workspace/helpers/getNewRootFolderConfig'
import { OS_WIN_HOMEFOLDER } from '../../../../mocks/mockFileData'

suite('Config > Helpers > getNewRootFolderConfig() | Windows:', () => {
  let foldersConfigStub: sinon.SinonStub
  let isWindowsStub: sinon.SinonStub
  let osStub: sinon.SinonStub

  const getPath = (folder: string, subfolder?: string): string => {
    let pathStr = `${OS_WIN_HOMEFOLDER}\\${folder}`

    if (subfolder) {
      pathStr = `${pathStr}\\${subfolder}`
    }

    return pathStr
  }

  const defaultPaths = [
    getPath('Music', 'Songs'),
    getPath('Dev'),
    getPath('Public'),
    getPath('Temp'),
  ]

  const defaultPathsNoSub = [getPath('Music'), getPath('Dev'), getPath('Public'), getPath('Temp')]

  setup(() => {
    foldersConfigStub = sinon.stub(foldersConfigs, 'getFoldersConfig').callsFake(() => defaultPaths)
    isWindowsStub = sinon.stub(windows, 'isWindows').callsFake(() => true)
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_WIN_HOMEFOLDER)
  })

  teardown(() => {
    foldersConfigStub.restore()
    isWindowsStub.restore()
    osStub.restore()
  })

  test('New folders are added', () => {
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Pictures',
        uri: vscode.Uri.file(getPath('Pictures')),
      },
    ])

    expect(result).to.eql([getPath('Pictures'), ...defaultPaths])
  })

  test('Deeper config folders are replaced with shallower new folders', () => {
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Music',
        uri: vscode.Uri.file(getPath('Music')),
      },
    ])

    expect(result).to.eql(defaultPathsNoSub)
  })

  test('New folders that are deeper than config folders are ingnored', () => {
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Vsc',
        uri: vscode.Uri.file(getPath('Dev', 'Vsc')),
      },
    ])

    expect(result).to.eql(defaultPaths)
  })

  test('Existing order of replaced folders is maintained', () => {
    foldersConfigStub.callsFake(() => [
      getPath('Music', 'Songs'),
      getPath('Dev', 'Vsc'),
      getPath('Public'),
      getPath('Temp'),
    ])

    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Pictures',
        uri: vscode.Uri.file(getPath('Pictures')),
      },
      {
        index: 1,
        name: 'Music',
        uri: vscode.Uri.file(getPath('Music')),
      },
      {
        index: 2,
        name: 'Music',
        uri: vscode.Uri.file(getPath('Dev')),
      },
    ])

    expect(result).to.eql([getPath('Pictures'), ...defaultPathsNoSub])
  })
})
