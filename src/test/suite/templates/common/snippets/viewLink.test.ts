import { expect } from 'chai'
import { viewLink } from '../../../../../templates/common/snippets/viewLink'

suite('Templates > Common > Snippets: viewLink()', () => {
  test('Renders as expected', () => {
    const linkText = 'Check extension settings'
    const linkType = 'SETTINGS'
    const result = viewLink(linkText, linkType)

    expect(result).to.be.a('string')
    expect(result).contains(`<a class="view__link" data-type="${linkType}"`)
    expect(result).contains(linkText)
  })
})
