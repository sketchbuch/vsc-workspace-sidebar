import { expect } from 'chai'
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
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > fetch()', () => {
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub
  let treeConfigStub: sinon.SinonStub

  setup(() => {
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon
      .stub(foldersConfigs, 'getFolderConfig')
      .callsFake(() => ROOT_FOLDER_PATH)
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    condenseConfigStub.restore()
    folderConfigStub.restore()
    treeConfigStub.restore()
  })

  test('Pending updates state as expected', () => {
    const state = getMockState({
      isFolderInvalid: true,
      state: 'invalid',
    })
    const expectedState = getMockState({
      isFolderInvalid: false,
      state: 'loading',
    })

    expect(state).not.to.eql(expectedState)
    fetchPending(state)
    expect(state).to.eql(expectedState)
  })

  test('Rejected updates state as expected', () => {
    const state = getMockState({
      error: '',
      state: 'invalid',
    })
    const expectedState = getMockState({
      error: 'FETCH',
      state: 'error',
    })

    expect(state).not.to.eql(expectedState)
    fetchRejected(state)
    expect(state).to.eql(expectedState)
  })

  suite('Fulfilled:', () => {
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
        payload: { files: [], result: 'none' },
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
        payload: { files: getMockFileList(), result: 'none' },
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
        payload: { files: getMockFileList(), result: 'none' },
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
        payload: { files: getMockFileList(), result: 'none' },
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
        payload: { files: getMockFileList(), result: 'none' },
        type: 'ws/list',
      })
      expect(state.visibleFiles).to.eql(expectedState.visibleFiles)
    })
  })
})
