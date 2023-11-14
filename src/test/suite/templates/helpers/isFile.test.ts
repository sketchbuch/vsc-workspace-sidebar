import { expect } from 'chai'
import { isFile } from '../../../../templates/helpers/isFile'
import { file1, getMockFileTree } from '../../../mocks/mockFileData'

suite('Templates > Helpers > isFile():', () => {
  test('Returns false if item is FileTree', () => {
    expect(isFile(getMockFileTree('normal'))).to.be.false
  })

  test('Returns true if item is File', () => {
    expect(isFile(file1)).to.be.true
  })
})
