import { expect } from 'chai'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk'
import {
  getMockFileTree,
  getMockConvertedFiles,
  getMockFileList,
  getMockFolderList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
} from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderStateBulk()', () => {
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub
  let treeConfigStub: sinon.SinonStub

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH)
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false)
  })

  teardown(() => {
    condenseConfigStub.restore()
    folderConfigStub.restore()
    treeConfigStub.restore()
  })

  test('"expand" clears closedFolders, if there were any', () => {
    const state = getMockState({
      closedFolders: ['vsc', 'react', 'react/test'],
    })
    const expectedState = getMockState()

    expect(state).not.to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })

  test('"expand" does nothing if there are no closedFolders', () => {
    const state = getMockState()
    const expectedState = getMockState()

    expect(state).to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })

  test('"collapse" does nothing if there are no visibleFiles', () => {
    const state = getMockState()
    const expectedState = getMockState()

    expect(state).to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })

  test('"collapse" does nothing if all folders are closed', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      closedFolders: getMockFolderList('normal'),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      closedFolders: getMockFolderList('normal'),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })

  test('"collapse" will close all folders if some are still open', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      closedFolders: [...getMockFolderList('normal').slice(0, 1)],
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      closedFolders: getMockFolderList('normal'),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    })

    expect(state).not.to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })
})
