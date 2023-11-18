import { expect } from 'chai'
import { itemIndent } from '../../../../../templates/workspace/snippets/itemIndent'

suite('Templates > Workspace > Snippets: itemIndent()', () => {
  test('Renders an empty string for depth 0', () => {
    const result = itemIndent({ depth: 0 })

    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })

  test('Renders an indent div for each depth level', () => {
    const result = itemIndent({ depth: 2 })

    expect(result).to.be.a('string')
    expect(result).contains(`<div class="list_branch-indent-box">`)
    expect(result.match(/"list_branch-indent"/g) || []).to.have.lengthOf(2)
  })
})
