import { expect } from 'chai'
import { searchOption } from '../../../../../templates/workspace/snippets/searchOption'

suite('Templates > Workspace > Snippets: searchOption()', () => {
  test('Renders the option correctly', () => {
    const NAME = 'testOption'
    const LABEL = 'A test option'
    const CODICON = 'test-icon'
    const PRESSED = false

    const result = searchOption(NAME, PRESSED, LABEL, CODICON)

    expect(result).to.be.a('string')
    expect(result).contains('class="searchBox__options-button searchBox__options-button--toggle"')
    expect(result).contains('appearance="icon"')

    expect(result).contains(`class="codicon codicon-${CODICON}"`)
    expect(result).contains(`data-btnname="${NAME}"`)
    expect(result).contains(`title="${LABEL}"`)
    expect(result).contains(`name="${NAME}"`)
    expect(result).contains(`aria-pressed="${PRESSED}"`)
    expect(result).contains(`aria-label="${LABEL}"`)
  })
})
