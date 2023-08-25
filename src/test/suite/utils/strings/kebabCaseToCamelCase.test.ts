import { expect } from 'chai'
import { kebabCaseToCamelCase } from '../../../../utils/string/kebabCaseToCamelCase'

suite('Utils > Strings > kebabCaseToCamelCase()', () => {
  test('Returned object is as expected if the file does not exist', () => {
    expect(kebabCaseToCamelCase('a-test-string')).to.eql('aTestString')
  })
})
