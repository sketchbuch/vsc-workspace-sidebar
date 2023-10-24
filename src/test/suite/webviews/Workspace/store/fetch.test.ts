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
  ActionMetaRejected,
  WorkspaceThunkErrorAction,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { OS_HOMEFOLDER, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'

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
    } as WorkspaceThunkErrorAction<unknown, ActionMetaRejected>)
    expect(state).to.eql(expectedState)
  })

  suite('Fulfilled:', () => {
    test.only('Valid folder - tree - updates state as expected', () => {
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const { fileCount, rootFolders, visibleFileCount } = getMockRootFolders()
      const state = getMockState({
        isFolderInvalid: true,
        rootFolders: [],
        view: 'invalid',
      })
      const expectedState = getMockState({
        fileCount,
        invalidReason: 'ok',
        isFolderInvalid: false,
        rootFolders,
        view: 'list',
        visibleFileCount,
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { rootFolders, result: 'ok' },
        type: 'ws/list',
      })
      expect(state).to.eql(expectedState)
    })
  })

  /* suite('Fulfilled:', () => {
    test('Invalid folder - updates state as expected', () => {
      const state = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: [],
        isFolderInvalid: false,
        state: 'loading',
        visibleFiles: getMockVisibleFiles(),
      })
      const expectedState = getMockState({
        convertedFiles: [],
        files: [],
        isFolderInvalid: true,
        state: 'invalid',
        visibleFiles: [],
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { files: [], result: 'ok' },
        type: 'ws/list',
      })
      expect(state).to.eql(expectedState)
    })

    test('Valid folder - tree - updates state as expected', () => {
      condenseConfigStub.callsFake(() => false)
      treeConfigStub.callsFake(() => true)

      const state = getMockState({
        convertedFiles: [],
        files: [],
        isFolderInvalid: true,
        state: 'invalid',
        visibleFiles: [],
      })
      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: getMockFileTree('normal'),
        isFolderInvalid: false,
        state: 'list',
        visibleFiles: getMockVisibleFiles(),
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { files: getMockFileList(), result: 'ok' },
        type: 'ws/list',
      })
      expect(state.visibleFiles).to.eql(expectedState.visibleFiles)
    })

    test('Valid folder - tree condensed - updates state as expected', () => {
      treeConfigStub.callsFake(() => true)

      const state = getMockState({
        convertedFiles: [],
        files: [],
        isFolderInvalid: true,
        state: 'invalid',
        visibleFiles: [],
      })
      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: getMockFileTree('condensed'),
        isFolderInvalid: false,
        state: 'list',
        visibleFiles: getMockVisibleFiles(),
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { files: getMockFileList(), result: 'ok' },
        type: 'ws/list',
      })
      expect(state.visibleFiles).to.eql(expectedState.visibleFiles)
    })

    test('Valid folder - list asc - updates state as expected', () => {
      const state = getMockState({
        convertedFiles: [],
        files: [],
        isFolderInvalid: true,
        sort: 'ascending',
        state: 'invalid',
        visibleFiles: [],
      })
      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: null,
        isFolderInvalid: false,
        sort: 'ascending',
        state: 'list',
        visibleFiles: getMockVisibleFiles('asc'),
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { files: getMockFileList(), result: 'ok' },
        type: 'ws/list',
      })
      expect(state.visibleFiles).to.eql(expectedState.visibleFiles)
    })

    test('Valid folder - list desc - updates state as expected', () => {
      const state = getMockState({
        convertedFiles: [],
        files: [],
        isFolderInvalid: true,
        sort: 'descending',
        state: 'invalid',
        visibleFiles: [],
      })
      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: null,
        isFolderInvalid: false,
        sort: 'descending',
        state: 'list',
        visibleFiles: getMockVisibleFiles('desc'),
      })

      expect(state).not.to.eql(expectedState)
      fetchFulfilled(state, {
        meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
        payload: { files: getMockFileList(), result: 'ok' },
        type: 'ws/list',
      })
      expect(state.visibleFiles).to.eql(expectedState.visibleFiles)
    })
  }) */
})
