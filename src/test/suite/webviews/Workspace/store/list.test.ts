import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH, SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'
import {
  ActionMetaFulfilled,
  WorkspaceState,
  WorkspaceStateRootFolder,
  WorkspaceThunkAction,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FindAllRootFolderFiles } from '../../../../../utils/fs/findAllRootFolderFiles'
import { fetchFulfilled } from '../../../../../webviews/Workspace/store/fetch'

suite('Webviews > Workspace > Store > list()', () => {
  let compactFoldersConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let osStub: sinon.SinonStub
  let rootFoldersConfigStub: sinon.SinonStub
  let treeConfigStub: sinon.SinonStub

  setup(() => {
    compactFoldersConfigStub = sinon
      .stub(coreConfigs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => false)
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
    rootFoldersConfigStub = sinon
      .stub(foldersConfigs, 'getFoldersConfig')
      .callsFake(() => [ROOT_FOLDER_PATH])
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    compactFoldersConfigStub.restore()
    condenseConfigStub.restore()
    osStub.restore()
    rootFoldersConfigStub.restore()
    treeConfigStub.restore()
  })

  const getAction = (
    rootFolders: WorkspaceStateRootFolder[]
  ): WorkspaceThunkAction<FindAllRootFolderFiles, ActionMetaFulfilled> => {
    return {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: { result: 'ok', rootFolders },
      type: 'ws/list',
    }
  }

  const intialState: Partial<WorkspaceState> = {
    isFolderInvalid: true,
    rootFolders: [],
    view: 'invalid',
  }
  const defaultExpectedState: Partial<WorkspaceState> = {
    invalidReason: 'ok',
    isFolderInvalid: false,
    view: 'list',
  }

  suite('List:', () => {
    test('Sort "asc" updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'asc',
      })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Sort "desc" updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'desc',
      })
      const state = getMockState({
        ...intialState,
        sort: 'descending',
      })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        sort: 'descending',
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Sort "asc" searched updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        searchTerm: SEARCH_TERM,
        showTree: false,
        sortVsible: 'asc',
      })
      const search = getMockSearchState({ term: SEARCH_TERM })
      const state = getMockState({ ...intialState, search })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        search,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Sort "desc" searched updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        searchTerm: SEARCH_TERM,
        showTree: false,
        sortVsible: 'desc',
      })
      const search = getMockSearchState({ term: SEARCH_TERM })
      const state = getMockState({
        ...intialState,
        search,
        sort: 'descending',
      })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        search,
        sort: 'descending',
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })
  })

  suite('Tree:', () => {
    test('Normal updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => false)
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
        showTree: true,
      })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Condensed updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => false)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'condensed',
        showTree: true,
      })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Condensed/searched updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => false)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'condensed-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const search = getMockSearchState({ term: SEARCH_TERM })
      const state = getMockState({ ...intialState, search })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        search,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Compacted updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted',
        showTree: true,
      })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Compacted/searched updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const search = getMockSearchState({ term: SEARCH_TERM })
      const state = getMockState({ ...intialState, search })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        search,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Compacted/condensed updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-condensed',
        showTree: true,
      })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Compacted/condensed/searched updates state as expected', () => {
      compactFoldersConfigStub.callsFake(() => true)
      condenseConfigStub.callsFake(() => true)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'compacted-condensed-searched',
        searchTerm: SEARCH_TERM,
        showTree: true,
      })
      const search = getMockSearchState({ term: SEARCH_TERM })
      const state = getMockState({ ...intialState, search })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        search,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })
  })

  /* test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: getMockVisibleFiles(),
    })
    const expectedState = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'no-workspaces',
      isFolderInvalid: true,
      state: 'invalid',
      visibleFiles: [],
    })

    expect(state).not.to.eql(expectedState)
    list(state, { payload: [], type: 'ws/list' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree uncompacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'list',
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree uncompacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed'),
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'list',
      treeFolders: getMockFolderList('condensed'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree compacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted'),
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'list',
      treeFolders: getMockFolderList('compacted'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree compacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-condensed'),
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'list',
      treeFolders: getMockFolderList('compacted-condensed'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - flat list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      sort: 'ascending',
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      invalidReason: 'ok',
      isFolderInvalid: false,
      sort: 'ascending',
      state: 'list',
      visibleFiles: getMockVisibleFiles('asc'),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - flat list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      sort: 'descending',
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      invalidReason: 'ok',
      isFolderInvalid: false,
      sort: 'descending',
      state: 'list',
      visibleFiles: getMockVisibleFiles('desc'),
    })

    expect(state).not.to.eql(expectedState)
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    })
    expect(state).to.eql(expectedState)
  }) */
})
