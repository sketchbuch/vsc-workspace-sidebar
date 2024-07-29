import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import { FS_WS_FILETYPE } from '../../../../constants/fs'
import { getFilenamesOfType } from '../../../../utils/fs/getFilenamesOfType'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

// MockFS seems broken
suite.skip('Utils > Fs > getFilenamesOfType()', () => {
  const FOLDER = 'get-filenames-of-type'

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  test('An empty array is returned if there are no filenames', () => {
    expect(getFilenamesOfType('folders', [], '/test', FS_WS_FILETYPE)).to.eql([])
  })

  test('An array of folders is returned if there are folders in filenames', () => {
    expect(
      getFilenamesOfType(
        'folders',
        ['test-subfolder1', 'test-subfolder2', 'test-subfolder3'],
        FOLDER,
        FS_WS_FILETYPE
      )
    ).to.eql([path.join(FOLDER, 'test-subfolder1'), path.join(FOLDER, 'test-subfolder2')])
  })

  test('An array of files is returned if there are files in filenames matching the fileType', () => {
    expect(
      getFilenamesOfType(
        'files',
        ['test-file.txt', 'test-file2.jpg', 'test-file3'],
        FOLDER,
        FS_WS_FILETYPE
      )
    ).to.eql([path.join(FOLDER, 'test-file.txt')])
  })
})
