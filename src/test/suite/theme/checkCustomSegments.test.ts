import { expect } from 'chai'
import { checkCustomSegments } from '../../../theme/checkCustomSegments'

suite('Themes > checkCustomSegments():', () => {
  const match = 'typescript'
  const nameSegments: string[] = ['some', 'name']
  const pathSegments: string[] = ['any', 'folder']
  const iconMatches: string[] = [match]

  test('Returns an empty string if matches array is empty', () => {
    expect(checkCustomSegments({}, nameSegments, pathSegments, [])).is.empty
  })

  test('Returns an empty string if no custom keys', () => {
    expect(checkCustomSegments({}, nameSegments, pathSegments, ['nonexistent'])).is.empty
  })

  test('Returns match when found in name segments', () => {
    expect(
      checkCustomSegments(
        { [match]: ['name'] },
        [...nameSegments, match],
        pathSegments,
        iconMatches
      )
    ).to.eql(match)
  })

  test('Returns match when found in path segments', () => {
    expect(
      checkCustomSegments(
        { [match]: ['name'] },
        nameSegments,
        [...pathSegments, match],
        iconMatches
      )
    ).to.eql(match)
  })
})
