import { expect } from 'chai'
import * as sinon from 'sinon'
import * as links from '../../../../../templates/common/snippets/viewLink'
import { errorView } from '../../../../../templates/workspace/views/errorView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: errorView()', () => {
  let vlSpy: sinon.SinonSpy

  setup(() => {
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    vlSpy.restore()
  })

  const mockRenderVars = getMockRenderVars()

  test('Renders as expected', () => {
    const result = errorView(getMockState(), mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('class="view error"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>')
    expect(result).contains('An unknown error occured')

    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS')
  })

  test('Renders FETCH error message', () => {
    const result = errorView(getMockState({ error: 'FETCH' }), mockRenderVars)
    expect(result).contains('An error occured whilst collecting workspace files')
  })
})
