import { expect } from 'chai'
import { hoverNotification } from '../../../../../templates/workspace/snippets/hoverNotification'

suite('Templates > Workspace > Snippets: hoverNotification()', () => {
  const message = 'The notfication message'
  const title = 'The notfication title'

  test('Renders as expected', () => {
    const result = hoverNotification({ message, title })

    expect(result).to.be.a('string')
    expect(result).contains(`<p class="hover-notification__title">`)
    expect(result).contains(title)
    expect(result).contains(`<p class="hover-notification__message">`)
    expect(result).contains(message)
  })

  test('Renders as expected if no message', () => {
    const result = hoverNotification({ title })
    expect(result).not.contains(`<p class="hover-notification__message">`)
  })

  test('Renders as expected if no title', () => {
    const result = hoverNotification({ message })
    expect(result).not.contains(`<p class="hover-notification__title">`)
  })
})
