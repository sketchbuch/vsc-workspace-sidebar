import { expect } from 'chai'
import { getAllFoldersFromTree } from '../../../../../webviews/Workspace/helpers/getAllFoldersFromTree'
import { getMockFileTree, getMockFolderList } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > getAllFoldersFromTree():', () => {
  test('Returns expected folder list', () => {
    const tree = getMockFileTree('normal')
    const result = getAllFoldersFromTree(tree)
    const expected = getMockFolderList('normal')

    expect(result).to.eql(expected)
  })
})
