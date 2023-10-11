import { expect } from 'chai'
import { setSort } from '../../../../../webviews/Workspace/store/setSort'
import { getMockVisibleFiles } from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setSort()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      sort: 'descending',
      visibleFiles: getMockVisibleFiles(),
    })
    const expectedState = getMockState({
      sort: 'ascending',
      visibleFiles: getMockVisibleFiles().reverse(),
    })

    expect(state).not.to.eql(expectedState)
    setSort(state, { payload: { sort: 'ascending' }, type: 'ws/setPersistedState' })
    expect(state).to.eql(expectedState)
  })
})
