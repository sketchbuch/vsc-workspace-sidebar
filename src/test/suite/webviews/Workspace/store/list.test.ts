import { expect } from 'chai'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import { list } from '../../../../../webviews/Workspace/store/list'
import {
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
} from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > list()', () => {
  let compactConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub
  let treeConfigStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon.stub(configs, 'getExplorerCompactFoldersConfig').callsFake(() => true)
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH)
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    compactConfigStub.restore()
    condenseConfigStub.restore()
    folderConfigStub.restore()
    treeConfigStub.restore()
  })

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: [],
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed'),
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted'),
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-condensed'),
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      sort: 'ascending',
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      invalidReason: 'none',
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
      invalidReason: 'none',
      isFolderInvalid: false,
      sort: 'descending',
      state: 'loading',
      visibleFiles: [],
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      invalidReason: 'none',
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
  })
})
