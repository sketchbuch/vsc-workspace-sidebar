import { expect } from 'chai'
import * as sinon from 'sinon'
import * as links from '../../../../../templates/common/snippets/viewLink'
import { loadingView } from '../../../../../templates/workspace/views/loadingView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: loadingView()', () => {
  let vlSpy: sinon.SinonSpy

  setup(() => {
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    vlSpy.restore()
  })

  test('Renders as expected', () => {
    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('class="view loading"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains(
      '<span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>'
    )
    expect(result).contains('Collecting workspaces...')
    expect(result).contains('If this is taking a long time, try and ')

    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'exclude folders', 'EXCLUDE_FOLDERS')
  })
})
