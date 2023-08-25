import { expect } from 'chai'
import * as sinon from 'sinon'
import { searchBox } from '../../../../../templates/workspace/snippets/searchBox'
import * as templates from '../../../../../templates/workspace/snippets/searchOption'
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

  test('Includes search options', () => {
    const spy = sinon.spy(templates, 'searchOption')

    const mockState = getMockState({ search: getMockSearchState({ term: 'VSCode' }) })
    const result = searchBox(mockState)
    expect(result).contains('<section aria-label="Search options"')

    sinon.assert.callCount(spy, 2)
    expect(
      spy
        .getCall(0)
        .calledWithExactly(
          'matchStart',
          mockState.search.matchStart,
          'Match start of label',
          'export'
        )
    ).to.equal(true)
    expect(
      spy
        .getCall(1)
        .calledWithExactly(
          'caseInsensitive',
          mockState.search.caseInsensitive,
          'Case insensitive',
          'case-sensitive'
        )
    ).to.equal(true)
    spy.restore()
  })
})
