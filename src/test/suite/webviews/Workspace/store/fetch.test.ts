/* import { expect } from 'chai'
import * as sinon from 'sinon'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../../webviews/Workspace/store/fetch'
import {
  ROOT_FOLDER_PATH,
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockVisibleFiles,
} from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState' */

import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../../webviews/Workspace/store/fetch'
import {
  ActionMetaFulfilled,
  WorkspaceState,
  WorkspaceStateRootFolder,
  WorkspaceThunkAction,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'
import { FindAllRootFolderFiles } from '../../../../../utils/fs/findAllRootFolderFiles'

suite.only('Webviews > Workspace > Store > fetch()', () => {
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

  test('Pending updates state as expected', () => {
    const state = getMockState({
      invalidReason: 'invalid-folder',
      isFolderInvalid: true,
      view: 'invalid',
    })
    const expectedState = getMockState({
      invalidReason: 'ok',
      isFolderInvalid: false,
      view: 'loading',
    })

    expect(state).not.to.eql(expectedState)
    fetchPending(state)
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
      meta: { arg: undefined, requestId: '', requestStatus: 'rejected' },
      payload: null,
      type: 'ws/fetchRejected',
    })
    expect(state).to.eql(expectedState)
  })

  suite('Fulfilled:', () => {
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

    test('Result not "ok" - updates state as expected', () => {
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const state = getMockState(intialState)
      const expectedState = getMockState({
        fileCount: 0,
        invalidReason: 'invalid-folder',
        isFolderInvalid: true,
        rootFolders: [],
        view: 'invalid',
        visibleFileCount: 0,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { result: 'invalid-folder', rootFolders: [] },
        type: 'ws/list',
      })
      expect(state).to.eql(expectedState)
    })

    test('Valid folder - tree - updates state as expected', () => {
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const mockRootFolders = getMockRootFolders({ showTree: true })
      const state = getMockState(intialState)
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })

    test('Valid folder - tree condensed - updates state as expected', () => {
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

    test('Valid folder - list asc - updates state as expected', () => {
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

    test('Valid folder - list desc - updates state as expected', () => {
      const mockRootFolders = getMockRootFolders({
        showTree: false,
        sortVsible: 'desc',
      })
      const state = getMockState({ ...intialState, sort: 'descending' })
      const expectedState = getMockState({
        ...defaultExpectedState,
        ...mockRootFolders,
        sort: 'descending',
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, getAction(mockRootFolders.rootFolders))
      expect(state).to.eql(expectedState)
    })
  })
})
