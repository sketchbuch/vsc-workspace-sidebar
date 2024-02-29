import { expect } from 'chai'
import * as sinon from 'sinon'
import * as links from '../../../../../templates/common/snippets/viewLink'
import { invalidView } from '../../../../../templates/workspace/views/invalidView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: invalidView()', () => {
  let vlSpy: sinon.SinonSpy

  setup(() => {
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    vlSpy.restore()
  })

  test('Renders the base view', () => {
    const result = invalidView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('class="view invalid"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>')
  })

  test('Renders a settings link', () => {
    invalidView(getMockState(), getMockRenderVars())

    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS')
  })

  test.skip('Renders an no-root-folders error', () => {
    /*     const result = invalidView(
      getMockState({ result: 'no-root-folders' }),
      getMockRenderVars({ depth: 1 })
    )

    expect(result).contains(
      "No root folders specified. Please edit the config option 'workspaceSidebar.rootFolders'"
    )
    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'ROOT_FOLDERS') */
  })

  test.skip('Renders an invalid-folder error', () => {
    /*     const result = invalidView(
      getMockState({ result: 'invalid-folder' }),
      getMockRenderVars({ depth: 1 })
    )

    expect(result).contains('None of the root folders are directories')
    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS') */
  })

  test.skip('Renders a no-workspaces error', () => {
    /*     const result = invalidView(
      getMockState({ result: 'no-workspaces' }),
      getMockRenderVars({ depth: 1 })
    )

    expect(result).contains('Folders contain no workspaces')
    expect(result).contains('Try increasing the search depth or change the folders.')
    expect(result).not.contains(
      'The current search depth is 0, this means that only the root folders will be searched in for workspace files.'
    )
    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS') */
  })

  test.skip('Renders a no-workspaces error (zero depth)', () => {
    /*     const result = invalidView(
      getMockState({ result: 'no-workspaces' }),
      getMockRenderVars({ depth: 0 })
    )

    expect(result).contains('Folders contain no workspaces')
    expect(result).contains('Try increasing the search depth or change the folders.')
    expect(result).contains(
      'The current search depth is 0, this means that only the root folders will be searched in for workspace files.'
    )
    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS') */
  })

  test.skip('Renders an generic error in other cases', () => {
    /*     const result = invalidView(getMockState({ result: 'ok' }), getMockRenderVars({ depth: 1 }))

    expect(result).contains('Something went wrong whilst collecting workspaces')
    sinon.assert.callCount(vlSpy, 1)
    sinon.assert.calledWith(vlSpy, 'Check extension settings', 'SETTINGS') */
  })
})
