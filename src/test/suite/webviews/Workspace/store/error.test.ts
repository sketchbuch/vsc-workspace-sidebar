import { expect } from 'chai'
import { error } from '../../../../../webviews/Workspace/store/error'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > error()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: '',
      files: [],
      invalidReason: 'invalid-folder',
      isFolderInvalid: true,
      state: 'invalid',
    })
    const expectedState = getMockState({
      error: 'FETCH',
      files: [],
      invalidReason: 'ok',
      isFolderInvalid: false,
      state: 'error',
    })

    expect(state).not.to.eql(expectedState)
    error(state, { payload: 'FETCH', type: 'ws/error' })
    expect(state).to.eql(expectedState)
  })
})
