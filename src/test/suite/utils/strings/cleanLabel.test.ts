import { expect } from 'chai'
import { cleanLabel } from '../../../../utils/string/cleanLabel'

suite('Utils > Strings > cleanLabel()', () => {
  test('Returns the label reformatted to Title Case', () => {
    const result = cleanLabel(`create_React-APP`)
    expect(result).to.equal('Create React App')
  })
})
