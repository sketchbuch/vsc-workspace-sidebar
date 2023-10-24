import { expect } from 'chai'
import { error } from '../../../../../webviews/Workspace/store/error'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > error()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: '',
      invalidReason: 'invalid-folder',
      isFolderInvalid: true,
      view: 'invalid',
    })
    const expectedState = getMockState({
      error: 'DEFAULT',
      errorObj: { message: 'some error' },
      invalidReason: 'ok',
      isFolderInvalid: false,
      view: 'error',
    })

    expect(state).not.to.eql(expectedState)
    error(state, { payload: { message: 'some error' }, type: 'ws/error' })
    expect(state).to.eql(expectedState)
  })
})
