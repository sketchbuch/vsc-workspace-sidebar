import { expect } from 'chai'
import { capitalise } from '../../../../../webviews/Workspace/helpers/capitalise'

suite('Webviews > Workspace > Helpers > capitalise()', () => {
  test('Returns the string with the first letter capitalised', () => {
    expect(capitalise('test')).to.equal('Test')
  })
})
