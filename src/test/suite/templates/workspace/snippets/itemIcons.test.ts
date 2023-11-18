import { expect } from 'chai'
import * as sinon from 'sinon'
import * as icons from '../../../../../templates/getImgUrls'
import {
  itemIconClosed,
  itemIconFile,
  itemIconFiletheme,
  itemIconOpen,
  itemIconSelected,
} from '../../../../../templates/workspace/snippets/itemIcons'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: itemIcons', () => {
  const mockRenderVars = getMockRenderVars()

  test('itemIconOpen()', () => {
    const result = itemIconOpen()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-down`)
  })

  test('itemIconClosed()', () => {
    const result = itemIconClosed()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-chevron-right`)
  })

  test('itemIconFile()', () => {
    const result = itemIconFile()

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon codicon codicon-record-smal`)
  })

  test('Renders correctly', () => {
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

  test('itemIconFiletheme()', () => {
    const result = itemIconFiletheme('c++')
    console.log('### result', result)

    expect(result).to.be.a('string')
    expect(result).contains(`list_branch-icon file-icon file-icon-type-cpp"`)
  })
})
