import { expect } from 'chai'
import { settingsLink } from '../../../../../templates/common/snippets/settingsLink'

suite('Templates > Common > Snippets: settingsLink()', () => {
  test('Renders as expected', () => {
    const result = settingsLink()

    expect(result).to.be.a('string')
    expect(result).contains('<a class="view__link view__message-description"')
    expect(result).contains('Check extension settings')
  })
})
