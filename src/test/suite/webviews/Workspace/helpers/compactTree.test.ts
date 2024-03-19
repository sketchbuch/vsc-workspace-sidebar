import { expect } from 'chai'
import { compactTree } from '../../../../../webviews/Workspace/helpers/compactTree'
import { getMockFileTree } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > compactTree():', () => {
  test('Returns the expected compacted filetree', () => {
    const result = compactTree(getMockFileTree('normal'))
    expect(result).to.eql(getMockFileTree('compacted'))
  })
})
