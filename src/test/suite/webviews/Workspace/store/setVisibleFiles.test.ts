import { expect } from 'chai'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { setVisibleFiles } from '../../../../../webviews/Workspace/store/setVisibleFiles'
import {
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
} from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setVisibleFiles()', () => {
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
      .stub(foldersConfigs, 'getFolderConfig')
      .callsFake(() => ROOT_FOLDER_PATH)
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    compactConfigStub.restore()
    condenseConfigStub.restore()
    folderConfigStub.restore()
    treeConfigStub.restore()
  })

  test('No files updates state as expected', () => {
    const state = getMockState()
    const expectedState = getMockState()

    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - tree uncompacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - tree uncompacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed'),
      treeFolders: getMockFolderList('condensed'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - tree compacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => false)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted'),
      treeFolders: getMockFolderList('compacted'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - tree compacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true)
    condenseConfigStub.callsFake(() => true)
    treeConfigStub.callsFake(() => true)

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-condensed'),
      treeFolders: getMockFolderList('compacted-condensed'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'ascending',
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      sort: 'ascending',
      visibleFiles: getMockVisibleFiles('asc'),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })

  test('With files - list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'descending',
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      sort: 'descending',
      visibleFiles: getMockVisibleFiles('desc'),
    })

    expect(state).not.to.eql(expectedState)
    setVisibleFiles(state)
    expect(state).to.eql(expectedState)
  })
})
