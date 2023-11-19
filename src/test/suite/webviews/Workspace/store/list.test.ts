import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { FindAllRootFolderFiles } from '../../../../../utils/fs/findAllRootFolderFiles'
import {
  ActionMetaFulfilled,
  WorkspaceState,
  WorkspaceStateRootFolder,
  WorkspaceThunkAction,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { fetchFulfilled } from '../../../../../webviews/Workspace/store/fetch'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH, SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'

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
    result: 'ok',
    isFolderInvalid: false,
    view: 'list',
  }

  suite('List:', () => {
    test('Sort "asc" updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        showTree: false,
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

    test('Sort "asc" searched updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        searchTerm: SEARCH_TERM,
        showTree: false,
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
})
