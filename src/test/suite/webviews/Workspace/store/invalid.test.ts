import { expect } from 'chai'
import { invalid } from '../../../../../webviews/Workspace/store/invalid'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > invalid()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      view: 'error',
    })
    const expectedState = getMockState({
      rootFolders: [],
      view: 'invalid',
    })

    expect(state).not.to.eql(expectedState)
    invalid(state)
    expect(state).to.eql(expectedState)
  })
})
