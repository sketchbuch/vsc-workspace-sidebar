import { expect } from 'chai'
import { getListClass } from '../../../../templates/helpers/getListClass'

suite('Templates > Helpers > getListClass():', () => {
  test('Returns classes for list view', () => {
    expect(getListClass(false)).to.equal('list__list list__styled-list')
  })

  test('Returns classes for tree view', () => {
    expect(getListClass(true)).to.equal('list__list list__styled-list list__styled-list--tree')
  })
})
