import { expect } from 'chai'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import { setSearch } from '../../../../../webviews/Workspace/store/setSearch'
import {
  file4,
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
  SEARCH_TERM
} from '../../../../mocks/mockFileData'
import { getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite.only('Webviews > Workspace > Store > setSearch()', () => {
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
      files: [],
      fileTree: getMockFileTree('normal'),
      visibleFiles: getMockVisibleFiles()
    })
    const expectedState = getMockState({
      search: getMockSearchState({ term: SEARCH_TERM }),
      visibleFiles: []
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree uncompacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      visibleFiles: getMockVisibleFiles()
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('searched'),
      search: getMockSearchState({ term: SEARCH_TERM }),
      treeFolders: getMockFolderList('searched'),
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree uncompacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      visibleFiles: getMockVisibleFiles()
    })

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed-searched'),
      search: getMockSearchState({ term: SEARCH_TERM }),
      treeFolders: getMockFolderList('condensed-searched'),
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree compacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      visibleFiles: getMockVisibleFiles()
    })

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-searched'),
      search: getMockSearchState({ term: SEARCH_TERM }),
      treeFolders: getMockFolderList('compacted-searched'),
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - tree compacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      visibleFiles: getMockVisibleFiles()
    })

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-condensed-searched'),
      search: getMockSearchState({ term: SEARCH_TERM }),
      treeFolders: getMockFolderList('compacted-condensed-searched'),
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'ascending',
      visibleFiles: getMockVisibleFiles()
    })

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      search: getMockSearchState({ term: SEARCH_TERM }),
      sort: 'ascending',
      treeFolders: [],
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  test('Valid folder - list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'descending',
      visibleFiles: getMockVisibleFiles()
    })

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      search: getMockSearchState({ term: SEARCH_TERM }),
      sort: 'descending',
      treeFolders: [],
      visibleFiles: [{ ...file4, showPath: false }]
    })

    expect(state).not.to.eql(expectedState)
    setSearch(state, { payload: { term: SEARCH_TERM }, type: 'ws/setSearch' })
    expect(state).to.eql(expectedState)
  })

  suite.only('Options:', () => {
    test('caseInsensitive updates correctly', () => {
      const state = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        search: getMockSearchState({ term: SEARCH_TERM }),
        sort: 'ascending',
        visibleFiles: getMockVisibleFiles()
      })

      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: null,
        search: getMockSearchState({ caseInsensitive: true, term: SEARCH_TERM }),
        sort: 'ascending',
        treeFolders: [],
        visibleFiles: [{ ...file4, showPath: false }]
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { caseInsensitive: true }, type: 'ws/setSearch' })
      expect(state).to.eql(expectedState)
    })

    test('matchStart updates correctly', () => {
      const state = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        search: getMockSearchState({ term: SEARCH_TERM }),
        sort: 'ascending',
        visibleFiles: getMockVisibleFiles()
      })

      const expectedState = getMockState({
        convertedFiles: getMockConvertedFiles(),
        files: getMockFileList(),
        fileTree: null,
        search: getMockSearchState({ matchStart: true, term: SEARCH_TERM }),
        sort: 'ascending',
        treeFolders: [],
        visibleFiles: [{ ...file4, showPath: false }]
      })

      expect(state).not.to.eql(expectedState)
      setSearch(state, { payload: { matchStart: true }, type: 'ws/setSearch' })
      expect(state).to.eql(expectedState)
    })
  })
})
