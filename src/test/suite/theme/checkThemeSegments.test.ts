import { expect } from 'chai'
import { checkThemeSegments } from '../../../theme/checkThemeSegments'

suite('Themes > checkThemeSegments():', () => {
  const match = 'typescript'
  const nameSegments: string[] = ['some', 'name']
  const pathSegments: string[] = ['any', 'folder']
  const iconMatches: string[] = [match]

  test('Returns an empty string if matches array is empty', () => {
    expect(checkThemeSegments(nameSegments, pathSegments, [])).is.empty
  })

  test('Returns an empty string if no match found', () => {
    expect(checkThemeSegments(nameSegments, pathSegments, ['nonexistent'])).is.empty
  })

  test('Returns match when found in name segments', () => {
    expect(checkThemeSegments([...nameSegments, match], pathSegments, iconMatches)).to.eql(match)
  })

  test('Returns match when found in path segments', () => {
    expect(checkThemeSegments(nameSegments, [...pathSegments, match], iconMatches)).to.eql(match)
  })
})
