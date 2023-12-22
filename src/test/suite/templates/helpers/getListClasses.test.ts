import { expect } from 'chai'
import { getListClasses } from '../../../../templates/helpers/getListClasses'

suite('Templates > Helpers > getListClasses():', () => {
  test('Returns classes for list view', () => {
    expect(getListClasses(false)).to.equal('list__list list__styled-list')
  })

  test('Returns classes for tree view', () => {
    expect(getListClasses(true)).to.equal('list__list list__styled-list list__styled-list--tree')
  })
})
