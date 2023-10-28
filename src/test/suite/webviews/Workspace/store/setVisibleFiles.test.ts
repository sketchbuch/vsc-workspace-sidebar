import { expect } from 'chai'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { setVisibleFiles } from '../../../../../webviews/Workspace/store/setVisibleFiles'
import { ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite.only('Webviews > Workspace > Store > setVisibleFiles()', () => {
  let compactConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub
  let treeConfigStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon
      .stub(coreConfigs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => true)
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon
      .stub(foldersConfigs, 'getFoldersConfig')
      .callsFake(() => [ROOT_FOLDER_PATH])
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    compactConfigStub.restore()
    condenseConfigStub.restore()
    folderConfigStub.restore()
    treeConfigStub.restore()
  })

  test('No root folders updates state as expected', () => {
    const state = getMockState({ rootFolders: [] })
    const expectedState = getMockState()

    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  suite('List:', () => {
    test('Asc updates state as expected', () => {
      treeConfigStub.callsFake(() => false)

      const mockRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'asc',
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'asc',
      })

      const state = getMockState({
        ...mockRootFolders,
        sort: 'ascending',
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
        sort: 'ascending',
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })

    test('Desc updates state as expected', () => {
      treeConfigStub.callsFake(() => false)

      const mockRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'desc',
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'desc',
      })

      const state = getMockState({
        ...mockRootFolders,
        sort: 'descending',
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
        sort: 'descending',
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })
  })

  suite('Tree:', () => {
    test('Normal updates state as expected', () => {
      compactConfigStub.callsFake(() => false)
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
        showTree: true,
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })

    test('Condensed updates state as expected', () => {
      compactConfigStub.callsFake(() => false)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'condensed',
        showTree: true,
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        fileTreeType: 'condensed',
        showTree: true,
      })

      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })

    test('Compacted updates state as expected', () => {
      compactConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted',
        showTree: true,
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        fileTreeType: 'compacted',
        showTree: true,
      })

      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })

    test('Compacted & condensed updates state as expected', () => {
      compactConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-condensed',
        showTree: true,
      })
      mockRootFolders.visibleFileCount = 0
      mockRootFolders.rootFolders[0].visibleFiles = []
      const mockExpectedRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-condensed',
        showTree: true,
      })

      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpectedRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      setVisibleFiles(state)
      expect(state).to.eql(expectedState)
    })
  })
})
