import { expect } from 'chai'
import { setSort } from '../../../../../webviews/Workspace/store/setSort'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setSort()', () => {
  test('Updates state as expected', () => {
    const mockRootFolders = getMockRootFolders({ sortVsible: 'desc' })
    const mockExpecetedRootFolders = getMockRootFolders({ sortVsible: 'asc' })
    const state = getMockState({
      ...mockRootFolders,
    })
    const expectedState = getMockState({
      ...mockExpecetedRootFolders,
    })

    expect(state).not.to.eql(expectedState)
    setSort(state, { payload: { sort: 'ascending' }, type: 'ws/setPersistedState' })
    expect(state).to.eql(expectedState)
  })
})
