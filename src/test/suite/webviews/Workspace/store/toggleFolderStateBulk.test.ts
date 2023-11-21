import { expect } from 'chai'
import * as sinon from 'sinon'
import * as treeConfigs from '../../../../../config/treeview'
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk'
import { ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderStateBulk()', () => {
  const closedFoldersAll = [
    ROOT_FOLDER,
    'code',
    'code/vscode',
    'code/vscode/some_ext',
    'flutter',
    'flutter/todo',
    'react',
    'react/router',
  ]
  const closedFoldersAllSub = [
    'code',
    'code/vscode',
    'code/vscode/some_ext',
    'flutter',
    'flutter/todo',
    'react',
    'react/router',
  ]
  const closedFoldersSomeSub = ['code/vscode/some_ext', 'react', 'react/router']

  let condenseConfigStub: sinon.SinonStub

  setup(() => {
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
  })

  teardown(() => {
    condenseConfigStub.restore()
  })

  test('Does not change state if visibleFileCount is 0', () => {
    const mockRootFolders = getMockRootFolders({
      fileTreeType: 'normal',
      showTree: true,
    })
    mockRootFolders.visibleFileCount = 0

    const state = getMockState({ ...mockRootFolders })
    const expectedState = getMockState({ ...mockRootFolders })

    expect(state).to.eql(expectedState)
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
    expect(state).to.eql(expectedState)
  })

  suite('Expand:', () => {
    test('Opens root folder, if all folders closed', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAll,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Opens all subfolders, if root folder is open', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAll,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Does nothing if there are no visibleFiles', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })
      mockRootFolders.rootFolders[0].visibleFiles = []

      const state = getMockState({ ...mockRootFolders })
      state.visibleFileCount = 0
      const expectedState = getMockState({ ...mockRootFolders })
      expectedState.visibleFileCount = 0

      expect(state).to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })
  })

  suite('Collapse:', () => {
    test('Closes all subfolders if none are closed', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: [],
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Closes all subfolders if some are closed', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersSomeSub,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Closes all folders and root folder, if all subfolders are closed', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: closedFoldersAll,
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Does nothing if there are no visibleFiles', () => {
      const mockRootFolders = getMockRootFolders({
        fileTreeType: 'normal',
        showTree: true,
      })
      mockRootFolders.rootFolders[0].visibleFiles = []

      const state = getMockState({ ...mockRootFolders })
      state.visibleFileCount = 0
      const expectedState = getMockState({ ...mockRootFolders })
      expectedState.visibleFileCount = 0

      expect(state).to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })
  })
})
