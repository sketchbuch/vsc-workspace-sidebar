import { expect } from 'chai'
import { error } from '../../../../../webviews/Workspace/store/error'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > error()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: '',
      result: 'is-file',
      view: 'invalid',
      workspaceData: [],
    })
    const expectedState = getMockState({
      error: 'DEFAULT',
      errorObj: { message: 'some error' },
      result: 'ok',
      view: 'error',
      workspaceData: [],
    })

    expect(state).not.to.eql(expectedState)
    error(state, { payload: { message: 'some error' }, type: 'ws/error' })
    expect(state).to.eql(expectedState)
  })
})
