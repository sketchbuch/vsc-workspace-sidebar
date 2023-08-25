import { expect } from 'chai'
import { FS_WS_FILETYPE } from '../../../../constants/fs'
import { isWorkspaceFile } from '../../../../utils/fs/isWorkspaceFile'

suite('Utils > Fs > isWorkspaceFile()', () => {
  test('Returns false if the schema is not "file"', () => {
    expect(isWorkspaceFile(`/a/file/test.${FS_WS_FILETYPE}`, 'something')).to.equal(false)
  })

  test('Returns false if the file is not workspace file', () => {
    expect(isWorkspaceFile(`/a/file/test.txt`, 'file')).to.equal(false)
  })

  test('Returns false for extensionless files', () => {
    expect(isWorkspaceFile(`/a/file/test`, 'file')).to.equal(false)
  })

  test('Returns true if the schema is "file" and the file is a workspace file', () => {
    expect(isWorkspaceFile(`/a/file/test.${FS_WS_FILETYPE}`, 'file')).to.equal(true)
  })

  test('Returns true if the schema is "file" and the file is a workspace file without folders', () => {
    expect(isWorkspaceFile(`test.${FS_WS_FILETYPE}`, 'file')).to.equal(true)
  })

  test('Correctly handles multiple dots in a file name', () => {
    expect(isWorkspaceFile(`/a/file/domain.com.${FS_WS_FILETYPE}`, 'file')).to.equal(true)
    expect(isWorkspaceFile(`domain.com.${FS_WS_FILETYPE}`, 'file')).to.equal(true)
  })
})
