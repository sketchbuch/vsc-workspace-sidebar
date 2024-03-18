import { expect } from 'chai'
import * as path from 'path'
import { isCompacted } from '../../../../../webviews/Workspace/helpers/isCompacted'

suite('Webviews > Workspace > Helpers > isCompacted():', () => {
  test('Returns false if file label does not contain path.sep', () => {
    const result = isCompacted({
      files: [],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: 'test',
      sub: [],
    })
    expect(result).to.equal(false)
  })

  test('Returns true if file label contains path.sep', () => {
    const result = isCompacted({
      files: [],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: `test${path.sep}test`,
      sub: [],
    })
    expect(result).to.equal(true)
  })
})
