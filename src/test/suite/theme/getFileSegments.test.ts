import { expect } from 'chai'
import * as path from 'path'
import { getNameSegments, getPathSegments } from '../../../theme/getFileSegments'

suite('Themes > GetFileSegments:', () => {
  const nameSegments = ['some', 'long', 'file', 'name', 'test']

  test('getNameSegments() returns a normalised array of name parts', () => {
    const fileName = 'Some long-file_NAME.test'

    expect(getNameSegments(fileName)).to.eql(nameSegments)
  })

  test('getNameSegments() replaces multiple occurances of space', () => {
    const fileName = 'Some long file NAME test'

    expect(getNameSegments(fileName)).to.eql(nameSegments)
  })

  test('getNameSegments() replaces multiple occurances of hyphen', () => {
    const fileName = 'Some-long-file-NAME-test'

    expect(getNameSegments(fileName)).to.eql(nameSegments)
  })

  test('getNameSegments() replaces multiple occurances of underscore', () => {
    const fileName = 'Some_long_file_NAME_test'

    expect(getNameSegments(fileName)).to.eql(nameSegments)
  })

  test('getPathSegments() returns a normalised array of name parts', () => {
    const pathStr = path.join(path.sep, 'some', 'LONG', 'file', 'Path')
    const pathSegements = ['path', 'file', 'long', 'some']

    expect(getPathSegments(pathStr)).to.eql(pathSegements)
  })
})
