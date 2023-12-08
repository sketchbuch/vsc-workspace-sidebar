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

  setup(() => {
    foldersConfigStub = sinon
      .stub(foldersConfigs, 'getFoldersConfig')
      .callsFake(() => [
        path.join('~', 'Music', 'Songs'),
        path.join('~', 'Dev'),
        path.join('~', 'Public'),
        path.join('~', 'Temp'),
      ])
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
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Pictures')),
      },
    ])

    expect(result).to.eql([
      path.join('~', 'Pictures'),
      path.join('~', 'Music', 'Songs'),
      path.join('~', 'Dev'),
      path.join('~', 'Public'),
      path.join('~', 'Temp'),
    ])
  })

  test('Deeper config folders are replaced with shallower new folders', () => {
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Music',
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Music')),
      },
    ])

    expect(result).to.eql([
      path.join('~', 'Music'),
      path.join('~', 'Dev'),
      path.join('~', 'Public'),
      path.join('~', 'Temp'),
    ])
  })

  test('New folders that are deeper than config folders are ingnored', () => {
    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Vsc',
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Dev', 'Vsc')),
      },
    ])

    expect(result).to.eql([
      path.join('~', 'Music', 'Songs'),
      path.join('~', 'Dev'),
      path.join('~', 'Public'),
      path.join('~', 'Temp'),
    ])
  })

  test('Existing order of replaced folders is maintained', () => {
    foldersConfigStub.callsFake(() => [
      path.join('~', 'Music', 'Songs'),
      path.join(OS_HOMEFOLDER, 'Dev', 'Vsc'),
      path.join('~', 'Public'),
      path.join('~', 'Temp'),
    ])

    const result = getNewRootFolderConfig([
      {
        index: 0,
        name: 'Pictures',
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Pictures')),
      },
      {
        index: 1,
        name: 'Music',
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Music')),
      },
      {
        index: 2,
        name: 'Music',
        uri: vscode.Uri.file(path.join(OS_HOMEFOLDER, 'Dev')),
      },
    ])

    expect(result).to.eql([
      path.join('~', 'Pictures'),
      path.join('~', 'Music'),
      path.join('~', 'Dev'),
      path.join('~', 'Public'),
      path.join('~', 'Temp'),
    ])
  })
})
