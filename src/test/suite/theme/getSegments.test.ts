import { expect } from 'chai'
import * as path from 'path'
import { getNameSegments, getPathSegments } from '../../../theme/getFileSegments'

suite('Themes > Get Segments:', () => {
  test('getNameSegments() returns a normalised array of name parts', () => {
    const fileName = 'Some long-file_NAME.test'
    const nameSegments = ['some', 'long', 'file', 'name', 'test']

    expect(getNameSegments(fileName)).to.eql(nameSegments)
  })

  test('getPathSegments() returns a normalised array of name parts', () => {
    const pathStr = path.join(path.sep, 'some', 'LONG', 'file', 'Path')
    const pathSegements = ['path', 'file', 'long', 'some']

    expect(getPathSegments(pathStr)).to.eql(pathSegements)
  })
})
