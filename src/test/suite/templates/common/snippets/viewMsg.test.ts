import { expect } from 'chai'
import { viewMsg } from '../../../../../templates/common/snippets/viewMsg'

suite('Templates > Common > Snippets: viewMsg()', () => {
  const message = 'The folder does not exist.'

  test('Titles render as expected', () => {
    const result = viewMsg({ message, type: 'title' })

    expect(result).to.be.a('string')
    expect(result).contains('"view__message"')
    expect(result).contains('"view__message-title')
    expect(result).contains('"view__message-icon codicon codicon-error"')

    expect(result).contains(message)
  })

  test('Descriptions render as expected', () => {
    const result = viewMsg({ message, type: 'description' })

    expect(result).to.be.a('string')
    expect(result).contains('"view__message"')
    expect(result).contains('"view__message-description')
    expect(result).contains(message)
  })

  test('isSmall adds tinytext class', () => {
    const result = viewMsg({ isSmall: true, message, type: 'title' })
    expect(result).contains('view__message-description--tinytext')
  })

  test('Icon is not shown for descriptions', () => {
    const result = viewMsg({ message, type: 'description' })
    expect(result).not.contains('"view__message-icon codicon')
  })

  test('iconType "error" shows the correct icon', () => {
    const result = viewMsg({ iconType: 'error', message, type: 'title' })
    expect(result).contains('"view__message-icon codicon codicon-error"')
  })

  test('iconType "search" shows the correct icon', () => {
    const result = viewMsg({ iconType: 'search', message, type: 'title' })
    expect(result).contains('"view__message-icon codicon codicon-search"')
  })

  test('iconType "loading" shows the correct icon', () => {
    const result = viewMsg({ iconType: 'loading', message, type: 'title' })
    expect(result).contains('"view__message-icon codicon codicon-loading codicon-modifier-spin"')
  })
})
