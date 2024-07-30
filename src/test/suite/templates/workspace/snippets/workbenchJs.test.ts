import { expect } from 'chai'
import { workbenchJs } from '../../../../../templates/workspace/snippets/workbenchJs'
import { RenderVars } from '../../../../../webviews/webviews.interface'
import { getMockRenderVars, getMockTreeConfig } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: workbenchJs()', () => {
  const nonce = 'nonce-wb-css'
  const mockRenderVars = getMockRenderVars()

  test('Renders JS correctly for singleClick', () => {
    const testRenderVars: RenderVars = {
      ...mockRenderVars,
      treeConfig: getMockTreeConfig({ expandMode: 'singleClick' }),
    }
    const result = workbenchJs(nonce, testRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains(`nonce="${nonce}"`)
    expect(result).contains(`const wbExpand = "singleClick";`)
  })

  test('Renders JS correctly for doubleClick', () => {
    const testRenderVars: RenderVars = {
      ...mockRenderVars,
      treeConfig: getMockTreeConfig({ expandMode: 'doubleClick' }),
    }
    const result = workbenchJs(nonce, testRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains(`nonce="${nonce}"`)
    expect(result).contains(`const wbExpand = "doubleClick";`)
  })
})
