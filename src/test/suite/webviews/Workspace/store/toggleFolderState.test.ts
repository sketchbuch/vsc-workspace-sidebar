import { expect } from 'chai'
import { toggleFolderState } from '../../../../../webviews/Workspace/store/toggleFolderState'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderState()', () => {
  const FOLDER = 'vsc'

  test('Adds open folder to closed list updates state as expected', () => {
    const mockRootFolders = getMockRootFolders({
      fileTreeType: 'normal',
      showTree: true,
    })
    const mockExpectedRootFolders = getMockRootFolders({
      closedFolders: [FOLDER],
      fileTreeType: 'normal',
      showTree: true,
    })

    const state = getMockState({ ...mockRootFolders })
    const expectedState = getMockState({ ...mockExpectedRootFolders })

    expect(state).not.to.eql(expectedState)
    toggleFolderState(state, {
      payload: { folder: FOLDER, folderPath: mockRootFolders.rootFolders[0].folderPath },
      type: 'ws/toggleFolderState',
    })
    expect(state).to.eql(expectedState)
  })

  test('Removes closed folder from closed list', () => {
    const mockRootFolders = getMockRootFolders({
      closedFolders: [FOLDER],
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
    toggleFolderState(state, {
      payload: { folder: FOLDER, folderPath: mockRootFolders.rootFolders[0].folderPath },
      type: 'ws/toggleFolderState',
    })
    expect(state).to.eql(expectedState)
  })

  test('Leaves state as-is if folder is an empty string', () => {
    const state = getMockState()
    const expectedState = getMockState()

    expect(state).to.eql(expectedState)
    toggleFolderState(state, {
      payload: { folder: '', folderPath: '' },
      type: 'ws/toggleFolderState',
    })
    expect(state).to.eql(expectedState)
  })

  test('Leaves state as-is if folderPath does not match rootFolder.folderPath', () => {
    const mockRootFolders = getMockRootFolders({
      fileTreeType: 'normal',
      showTree: true,
    })
    const mockExpectedRootFolders = getMockRootFolders({
      fileTreeType: 'normal',
      showTree: true,
    })

    const state = getMockState({ ...mockRootFolders })
    const expectedState = getMockState({ ...mockExpectedRootFolders })

    expect(state).to.eql(expectedState)
    toggleFolderState(state, {
      payload: { folder: FOLDER, folderPath: '/some/other/url' },
      type: 'ws/toggleFolderState',
    })
    expect(state).to.eql(expectedState)
  })
})
