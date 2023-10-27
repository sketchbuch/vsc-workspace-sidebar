import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { setFileTree } from '../../../../../webviews/Workspace/store/setFileTree'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setFileTree()', () => {
  let compactConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub
  let osStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon
      .stub(coreConfigs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => true)
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon
      .stub(foldersConfigs, 'getFoldersConfig')
      .callsFake(() => [ROOT_FOLDER_PATH])
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    compactConfigStub.restore()
    condenseConfigStub.restore()
    folderConfigStub.restore()
    osStub.restore()
  })

  test('Updates state as expected', () => {
    const mockRootFolders = getMockRootFolders({
      fileTreeType: 'compacted-condensed',
      showTree: true,
    })
    const mockExpectedRootFolders = getMockRootFolders({
      fileTreeType: 'compacted-condensed',
      showTree: true,
    })

    mockRootFolders.rootFolders[0].fileTree = null
    mockRootFolders.rootFolders[0].treeFolders = []

    const state = getMockState({
      ...mockRootFolders,
    })
    const expectedState = getMockState({
      ...mockExpectedRootFolders,
    })

    expect(state).not.to.eql(expectedState)
    setFileTree(state)
    expect(state).to.eql(expectedState)
  })
})
