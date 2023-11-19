import { expect } from 'chai'
import * as sinon from 'sinon'
import * as treeConfigs from '../../../../../config/treeview'
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderStateBulk()', () => {
  const closedFolders = ['vsc', 'react', 'react/test']
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
    test('Opens closed folders', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
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
    test('Closes open folders', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders,
        fileTreeType: 'normal',
        showTree: true,
      })
      const mockExpectedRootFolders = getMockRootFolders({
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
        closedFolders,
        fileTreeType: 'normal',
        showTree: true,
      })
      mockRootFolders.rootFolders[0].visibleFiles = []

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockRootFolders })

      expect(state).to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })

    test('Does nothing if there are no allFolders', () => {
      const mockRootFolders = getMockRootFolders({
        closedFolders,
        fileTreeType: 'normal',
        showTree: true,
      })
      mockRootFolders.rootFolders[0].allFolders = []

      const state = getMockState({ ...mockRootFolders })
      const expectedState = getMockState({ ...mockRootFolders })

      expect(state).to.eql(expectedState)
      toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' })
      expect(state).to.eql(expectedState)
    })
  })
})
