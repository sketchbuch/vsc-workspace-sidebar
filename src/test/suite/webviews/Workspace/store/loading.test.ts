import { expect } from 'chai'
import { loading } from '../../../../../webviews/Workspace/store/loading'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > loading()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: 'FETCH',
      errorObj: null,
      fileCount: 0,
      result: 'ok',
      rootFolders: [],
      selected: 'sdasd',
      view: 'loading',
      visibleFileCount: 0,
      workspaceData: [],
    })
    const expectedState = getMockState({
      error: '',
      errorObj: null,
      fileCount: 0,
      result: 'ok',
      rootFolders: [],
      selected: '',
      view: 'loading',
      visibleFileCount: 0,
      workspaceData: [],
    })

    expect(state).not.to.eql(expectedState)
    loading(state)
    expect(state).to.eql(expectedState)
  })
})
