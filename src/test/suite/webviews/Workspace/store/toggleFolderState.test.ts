import { expect } from 'chai'
import { toggleFolderState } from '../../../../../webviews/Workspace/store/toggleFolderState'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > toggleFolderState()', () => {
  const FOLDER = 'vsc'

  test('Adds open folder to closed list updates state as expected', () => {
    const state = getMockState()
    const expectedState = getMockState({
      closedFolders: [FOLDER]
    })

    expect(state).not.to.eql(expectedState)
    toggleFolderState(state, { payload: FOLDER, type: 'ws/toggleFolderState' })
    expect(state).to.eql(expectedState)
  })

  test('Removes closed folder from closed list', () => {
    const state = getMockState({
      closedFolders: [FOLDER]
    })
    const expectedState = getMockState({
      closedFolders: []
    })

    expect(state).not.to.eql(expectedState)
    toggleFolderState(state, { payload: FOLDER, type: 'ws/toggleFolderState' })
    expect(state).to.eql(expectedState)
  })

  test('Leaves state as-is if folder is an empty string', () => {
    const state = getMockState()
    const expectedState = getMockState()

    expect(state).to.eql(expectedState)
    toggleFolderState(state, { payload: '', type: 'ws/toggleFolderState' })
    expect(state).to.eql(expectedState)
  })
})
