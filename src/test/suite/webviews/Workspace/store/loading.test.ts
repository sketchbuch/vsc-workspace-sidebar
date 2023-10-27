import { expect } from 'chai'
import { loading } from '../../../../../webviews/Workspace/store/loading'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > loading()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: 'FETCH',
      errorObj: null,
      fileCount: 0,
      invalidReason: 'ok',
      isFolderInvalid: true,
      rootFolders: [],
      selected: 'sdasd',
      view: 'loading',
      visibleFileCount: 0,
    })
    const expectedState = getMockState({
      error: '',
      errorObj: null,
      fileCount: 0,
      invalidReason: 'ok',
      isFolderInvalid: false,
      rootFolders: [],
      selected: '',
      view: 'loading',
      visibleFileCount: 0,
    })

    expect(state).not.to.eql(expectedState)
    loading(state)
    expect(state).to.eql(expectedState)
  })
})
