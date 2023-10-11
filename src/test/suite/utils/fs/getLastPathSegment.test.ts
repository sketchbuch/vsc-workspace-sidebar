import { expect } from 'chai'
import * as path from 'path'
import { getLastPathSegment } from '../../../../utils/fs/getLastPathSegment'

suite('Utils > Fs > getLastPathSegment()', () => {
  test('Returns path as-is if path has no slash', () => {
    expect(getLastPathSegment('')).to.equal('')
    expect(getLastPathSegment('file.txt')).to.equal('file.txt')
    expect(getLastPathSegment('folder')).to.equal('folder')
  })

  test('Returns the last part of the path if there is a slash', () => {
    expect(getLastPathSegment(path.join('folder', 'file.txt'))).to.equal('file.txt')
    expect(getLastPathSegment(path.join('folder', 'subfolder'))).to.equal('subfolder')
  })
})
