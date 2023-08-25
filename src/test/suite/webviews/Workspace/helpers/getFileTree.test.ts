import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import * as compact from '../../../../../webviews/Workspace/helpers/compactTree'
import * as condense from '../../../../../webviews/Workspace/helpers/condenseTree'
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree'
import {
  OS_HOMEFOLDER,
  ROOT_FOLDER_USERPATH,
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
      .stub(configs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => false)
    compactSpy = sinon.spy(compact, 'compactTree')
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true)
    condenseSpy = sinon.spy(condense, 'condenseTree')
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_USERPATH)
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

    const result = getFileTree(getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('normal'))

    sinon.assert.notCalled(condenseSpy)
    sinon.assert.notCalled(compactSpy)
  })

  test('Returns the expected condensed filetree', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('condensed'))

    sinon.assert.callCount(condenseSpy, 5)
    sinon.assert.notCalled(compactSpy)
  })

  test('Returns the expected compacted filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)

    const result = getFileTree(getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('compacted'))

    sinon.assert.called(compactSpy)
    sinon.assert.notCalled(condenseSpy)
  })

  test('Returns the expected compacted & condensed filetree', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)

    const result = getFileTree(getMockVisibleFiles())
    expect(result).to.eql(getMockFileTree('compacted-condensed'))

    sinon.assert.called(compactSpy)
    sinon.assert.called(condenseSpy)
  })
})
