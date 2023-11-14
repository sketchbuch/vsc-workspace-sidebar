import { expect } from 'chai'
import { fileIconFile } from '../../../../../templates/workspace/snippets/fileIconFile'

suite('Templates > Workspace > Snippets: fileIconFile()', () => {
  test('treeIconOpen()', () => {
    const result = fileIconFile('c++')
    console.log('### result', result)

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon file-icon file-icon-type-cpp"`)
  })
})
