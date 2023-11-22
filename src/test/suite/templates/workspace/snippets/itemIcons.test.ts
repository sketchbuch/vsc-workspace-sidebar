import { expect } from 'chai'
import * as sinon from 'sinon'
import * as icons from '../../../../../templates/getImgUrls'
import {
  itemIconClosed,
  itemIconDummy,
  itemIconFile,
  itemIconFiletheme,
  itemIconOpen,
  itemIconSelected,
} from '../../../../../templates/workspace/snippets/itemIcons'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: itemIcons', () => {
  const mockRenderVars = getMockRenderVars()

  test('itemIconClosed()', () => {
    const result = itemIconClosed()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-right`)
  })

  test('itemIconDummy()', () => {
    const result = itemIconDummy()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon list_branch-icon-empty`)
  })

  test('itemIconFile()', () => {
    const result = itemIconFile()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-record-small`)
  })

  test('itemIconFiletheme()', () => {
    const result = itemIconFiletheme('c++')

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon file-icon file-icon-type-cpp"`)
  })

  test('itemIconOpen()', () => {
    const result = itemIconOpen()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-down`)
  })

  test('itemIconSelected()', () => {
    const spy = sinon.spy(icons, 'getImgUrls')

    const result = itemIconSelected(mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('class="view__icon list__icon"')
    expect(result).contains('<img alt="" data-theme="dark"')
    expect(result).contains('<img alt="" data-theme="light"')

    sinon.assert.callCount(spy, 1)
    sinon.assert.calledWith(spy, mockRenderVars, 'check')

    spy.restore()
  })
})
