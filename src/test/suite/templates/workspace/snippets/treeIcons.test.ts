import { expect } from 'chai'
import {
  treeIconClosed,
  treeIconFile,
  treeIconOpen
} from '../../../../../templates/workspace/snippets/treeIcons'

suite('Templates > Workspace > Snippets: treeIcons:', () => {
  test('treeIconOpen()', () => {
    const result = treeIconOpen()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-down`)
  })

  test('treeIconClosed()', () => {
    const result = treeIconClosed()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-right`)
  })

  test('treeIconFile()', () => {
    const result = treeIconFile()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-record-smal`)
  })
})
