import { expect } from 'chai'
import { isHiddenFile } from '../../../../../theme/utils/fs/isHiddenFile'

suite('Theme > Utils > Fs > isHiddenFile()', () => {
  test('Returns true if the fileName begins with a "."', () => {
    expect(isHiddenFile('.')).to.equal(true)
    expect(isHiddenFile('..')).to.equal(true)
    expect(isHiddenFile('.afile')).to.equal(true)
  })

  test('Returns false if the fileName does not begin with a "."', () => {
    expect(isHiddenFile('test.txt')).to.equal(false)
  })
})
