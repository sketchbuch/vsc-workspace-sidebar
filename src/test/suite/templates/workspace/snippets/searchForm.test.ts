import { expect } from 'chai'
import * as sinon from 'sinon'
import * as templates from '../../../../../templates/workspace/snippets/searchBox'
import { searchForm } from '../../../../../templates/workspace/snippets/searchForm'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: searchForm()', () => {
  test('Renders the form', () => {
    const spy = sinon.spy(templates, 'searchBox')
    const mockState = getMockState()
    const result = searchForm(mockState)

    expect(result).to.be.a('string')
    expect(result).contains('class="list__search"')
    expect(result).contains('role="search"')

    sinon.assert.callCount(spy, 1)
    sinon.assert.calledWith(spy, mockState)
    spy.restore()
  })
})
