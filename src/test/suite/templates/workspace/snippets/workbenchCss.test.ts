import { expect } from 'chai'
import { workbenchCss } from '../../../../../templates/workspace/snippets/workbenchCss'
import { RenderVars } from '../../../../../webviews/webviews.interface'
import { getMockRenderVars, getMockTreeConfig } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: workbenchCss()', () => {
  const nonce = 'nonce-wb-css'
  const indent = 20
  const mockRenderVars = getMockRenderVars()

  test('Renders CSS correctly', () => {
    const testRenderVars: RenderVars = {
      ...mockRenderVars,
      treeConfig: getMockTreeConfig({ indent }),
    }
    const result = workbenchCss(nonce, testRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains(`nonce="${nonce}"`)
    expect(result).contains(`.list_branch-indent {width: ${indent}px;}`)
  })
})
