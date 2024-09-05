import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import { FetchRootFolderFiles } from '../../../../../utils/fs/fetchRootFolderFiles'
import {
  ConfigRootFolder,
  WorkspaceState,
  WorkspaceStateRootFolder,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../../webviews/Workspace/store/fetch'
import {
  FetchFulfilledAction,
  FetchPendingAction,
} from '../../../../../webviews/Workspace/store/store.interface'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH, SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > fetch()', () => {
  const rootFolder: ConfigRootFolder = {
    depth: CONFIG_DEPTH,
    excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
    id: 'root-folder-1',
    path: ROOT_FOLDER_PATH,
  }
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
      .callsFake(() => [rootFolder])
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    compactFoldersConfigStub.restore()
    condenseConfigStub.restore()
    osStub.restore()
    rootFoldersConfigStub.restore()
    treeConfigStub.restore()
  })

  const getPendingAction = (rootFolder: ConfigRootFolder): FetchPendingAction<ConfigRootFolder> => {
    return {
      meta: { arg: rootFolder, requestId: '', requestStatus: 'pending' },
      payload: undefined,
      type: 'ws/fetchPending',
    }
  }

  test('Pending updates state as expected', () => {
    const state = getMockState({
      result: 'is-file',
      view: 'invalid',
    })
    const expectedState = getMockState({
      result: 'ok',
      view: 'list',
    })

    expect(state).not.to.eql(expectedState)
    fetchPending(state, getPendingAction(rootFolder))
    expect(state).to.eql(expectedState)
  })

  test('Rejected updates state as expected', () => {
    const errorObj = { message: 'some error' }
    const state = getMockState({
      error: '',
      errorObj: null,
      view: 'loading',
    })
    const expectedState = getMockState({
      error: 'FETCH',
      errorObj: errorObj,
      view: 'error',
    })

    expect(state).not.to.eql(expectedState)
    fetchRejected(state, {
      error: errorObj,
      meta: { aborted: false, arg: rootFolder, condition: false, requestId: '' },
      payload: null,
      type: 'ws/fetchRejected',
    })
    expect(state).to.eql(expectedState)
  })

  suite('Fulfilled (Success):', () => {
    const getAction = (
      rootFolders: WorkspaceStateRootFolder[]
    ): FetchFulfilledAction<ConfigRootFolder, FetchRootFolderFiles> => {
      return {
        meta: { arg: rootFolder, requestId: '' },
        payload: {
          configId: 'root-folder-1',
          rootFolder: rootFolders[0],
        },
        type: 'ws/list',
      }
    }

    const intialState: Partial<WorkspaceState> = {
      rootFolders: [],
      view: 'invalid',
    }
    const defaultExpectedState: Partial<WorkspaceState> = {
      result: 'ok',
      view: 'list',
    }

    suite('List:', () => {
      test('Updates state as expected', () => {
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
})
