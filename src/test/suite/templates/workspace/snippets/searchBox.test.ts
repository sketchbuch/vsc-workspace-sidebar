import { expect } from 'chai'
import { searchBox } from '../../../../../templates/workspace/snippets/searchBox'
import { getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: searchBox()', () => {
  test('Renders searchBox', () => {
    const mockState = getMockState({ search: getMockSearchState({ term: 'VSCode' }) })
    const result = searchBox(mockState)

    expect(result).to.be.a('string')
    expect(result).contains('class="searchBox"')
    expect(result).contains('id="searchWorkspaces"')
    expect(result).contains(`value="${mockState.search.term}"`)
  })
})
