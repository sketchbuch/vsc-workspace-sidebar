import { expect } from 'chai'
import { condenseTree } from '../../../../../webviews/Workspace/helpers/condenseTree'
import { getMockFileTree } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > condenseTree():', () => {
  test('Returns the expected condensed filetree', () => {
    const result = condenseTree(getMockFileTree('normal'))
    expect(result).to.eql(getMockFileTree('condensed'))
  })
})
