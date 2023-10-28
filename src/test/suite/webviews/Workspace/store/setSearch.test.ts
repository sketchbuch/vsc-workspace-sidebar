import { expect } from 'chai'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { setSearch } from '../../../../../webviews/Workspace/store/setSearch'
import { ROOT_FOLDER_PATH, SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setSearch()', () => {
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

  suite('List:', () => {
    setup(() => {
      treeConfigStub.callsFake(() => false)
    })

    test('Sort "asc" updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
      })
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'searched',
        searchTerm: SEARCH_TERM,
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
      expect(state).to.eql(expectedState)
    })

    test('Sort "desc" updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
        sortConverted: 'desc',
        sortVsible: 'desc',
      })
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'searched',
        searchTerm: SEARCH_TERM,
        sortConverted: 'desc',
        sortVsible: 'desc',
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
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
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
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
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'condensed-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
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
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
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
      const mockExpecetedRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-condensed-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const state = getMockState({
        ...mockRootFolders,
      })
      const expectedState = getMockState({
        ...mockExpecetedRootFolders,
        search: getMockSearchState({ term: SEARCH_TERM }),
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
      expect(state).to.eql(expectedState)
    })
  })
})
