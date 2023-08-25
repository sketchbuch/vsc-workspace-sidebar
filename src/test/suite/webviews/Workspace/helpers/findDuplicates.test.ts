import { expect } from 'chai'
import { findDuplicates } from '../../../../../webviews/Workspace/helpers/findDuplicates'

suite('Webviews > Workspace > Helpers > findDuplicates()', () => {
  test('Returns an array containing duplicate values', () => {
    expect(findDuplicates(['VSCode', 'Flutter', 'React', 'Flutter', 'JS', 'React'])).to.eql([
      'Flutter',
      'React',
    ])
  })
})
