import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import * as compact from '../../../../../webviews/Workspace/helpers/compactTree'
import * as condense from '../../../../../webviews/Workspace/helpers/condenseTree'
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree'
import { ConfigRootFolder } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  OS_HOMEFOLDER,
  ROOT_FOLDER_USERPATH,
  SEARCH_TERM,
  getMockFileTree,
  getMockVisibleFiles,
} from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  let compactConfigStub: sinon.SinonStub
  let compactSpy: sinon.SinonSpy
  let condenseConfigStub: sinon.SinonStub
  let condenseSpy: sinon.SinonSpy
  let folderConfigStub: sinon.SinonStub
  let osHomeStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon
      .stub(coreConfigs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => false)
    compactSpy = sinon.spy(compact, 'compactTree')
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    condenseSpy = sinon.spy(condense, 'condenseTree')
    folderConfigStub = sinon.stub(foldersConfigs, 'getFoldersConfig').callsFake(() => {
      const configFolders: ConfigRootFolder[] = [
        {
          depth: CONFIG_DEPTH,
          excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
          id: 'root-folder-1',
          path: ROOT_FOLDER_USERPATH,
        },
      ]

      return configFolders
    })
    osHomeStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    compactConfigStub.restore()
    compactSpy.restore()
    condenseConfigStub.restore()
    condenseSpy.restore()
    folderConfigStub.restore()
    osHomeStub.restore()
  })

  test('Returns the expected uncondensed & uncompacted filetree', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => false)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('normal'))

    sinon.assert.notCalled(condenseSpy)
    sinon.assert.notCalled(compactSpy)
  })

  test('Returns the expected condensed filetree', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('condensed'))

    sinon.assert.callCount(condenseSpy, 5)
    sinon.assert.notCalled(compactSpy)
  })

  test('Returns the expected compacted filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('compacted'))

    sinon.assert.called(compactSpy)
    sinon.assert.notCalled(condenseSpy)
  })

  test('Returns the expected compacted & condensed filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('compacted-condensed'))

    sinon.assert.called(compactSpy)
    sinon.assert.called(condenseSpy)
  })

  test('Returns the expected compacted & searched filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles(SEARCH_TERM))
    expect(result).to.eql(getMockFileTree('compacted-searched'))

    sinon.assert.called(compactSpy)
    sinon.assert.notCalled(condenseSpy)
  })

  test('Returns the expected condensed & searched filetree', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles(SEARCH_TERM))
    expect(result).to.eql(getMockFileTree('condensed-searched'))

    sinon.assert.notCalled(compactSpy)
    sinon.assert.called(condenseSpy)
  })

  test('Returns the expected searched filetree', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => false)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles(SEARCH_TERM))
    expect(result).to.eql(getMockFileTree('searched'))

    sinon.assert.notCalled(compactSpy)
    sinon.assert.notCalled(condenseSpy)
  })

  test('Returns the expected compacted, condensed, and searched filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(ROOT_FOLDER_USERPATH, getMockVisibleFiles(SEARCH_TERM))
    expect(result).to.eql(getMockFileTree('compacted-condensed-searched'))

    sinon.assert.called(compactSpy)
    sinon.assert.called(condenseSpy)
  })
})
