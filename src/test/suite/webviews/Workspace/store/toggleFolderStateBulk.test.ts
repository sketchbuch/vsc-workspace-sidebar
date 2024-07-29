import { expect } from 'chai'
import * as path from 'path'
import * as sinon from 'sinon'
import * as treeConfigs from '../../../../../config/treeview'
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk'
import { ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderStateBulk()', () => {
  const closedFoldersAll = [
    ROOT_FOLDER,
    'code',
    `code${path.sep}vscode`,
    `code${path.sep}vscode${path.sep}some_ext`,
    'flutter',
    `flutter${path.sep}todo`,
    'react',
    `react${path.sep}router`,
  ]
  const closedFoldersAllSub = [
    'code',
    `code${path.sep}vscode`,
    `code${path.sep}vscode${path.sep}some_ext`,
    'flutter',
    `flutter${path.sep}todo`,
    'react',
    `react${path.sep}router`,
  ]
  const closedFoldersSomeSub = [
    `code${path.sep}vscode${path.sep}some_ext`,
    'react',
    `react${path.sep}router`,
  ]

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
        closedFolders: closedFoldersAllSub,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: [],
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Opens all subfolders, if some subfolders are open', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders: closedFoldersSomeSub,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
        closedFolders: [],
        fileTreeType: 'normal',
        showTree: true,
      })

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockExpectedRootFolders })

      expect(state).not.to.eql(expectedState)
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
  })
})
