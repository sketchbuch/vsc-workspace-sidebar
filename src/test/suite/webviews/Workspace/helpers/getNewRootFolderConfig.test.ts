import { expect } from 'chai'
import os from 'os'
import * as path from 'path'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import * as foldersConfigs from '../../../../../config/folders'
import { getNewRootFolderConfig } from '../../../../../webviews/Workspace/helpers/getNewRootFolderConfig'
import { OS_HOMEFOLDER } from '../../../../mocks/mockFileData'

suite('Config > Helpers > getNewRootFolderConfig():', () => {
  let foldersConfigStub: sinon.SinonStub
  let osStub: sinon.SinonStub

  const getPath = (folder: string, subfolder?: string, useFulRoot: boolean = false): string => {
    let pathStr = path.join(useFulRoot ? OS_HOMEFOLDER : '~', folder)

    if (subfolder) {
      pathStr = path.join(pathStr, subfolder)
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
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    foldersConfigStub.restore()
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
      getPath('Dev', 'Vsc', true),
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
