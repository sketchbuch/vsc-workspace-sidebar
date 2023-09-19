import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import { checkFile } from '../../../../../themeNpm/utils/fs/checkFile'
import { mockFsStructure } from '../../mocks/mockFsStructure'

suite('Theme > Utils > Fs > checkFile()', () => {
  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  test('Returned object is as expected if the file does not exist', () => {
    expect(checkFile(path.join('a', 'non-existent', 'file'))).to.eql({
      isFile: false,
      isFolder: false,
    })
  })

  test('Returned object is as expected if the file does exist and is a file', () => {
    expect(checkFile(path.join('check', 'file', 'test-file.txt'))).to.eql({
      isFile: true,
      isFolder: false,
    })
  })

  test('Returned object is as expected if the file does exist and is a directory', () => {
    expect(checkFile(path.join('check', 'folder'))).to.eql({ isFile: false, isFolder: true })
  })
})
