import { expect } from 'chai'
import { setRootFolders } from '../../../../../webviews/Workspace/store/setRootFolders'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setRootFolders()', () => {
  test('Root folders are updated in state', () => {
    const state = getMockState({ rootFolders: [] })
    const mockRootFolders = getMockRootFolders()
    const expectedState = getMockState({ ...mockRootFolders })

    setRootFolders(state, { payload: mockRootFolders.rootFolders, type: 'ws/setRootFolders' })
    expect(state).to.eql(expectedState)
  })
})
