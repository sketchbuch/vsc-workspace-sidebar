import { expect } from 'chai'
import * as sinon from 'sinon'
import * as settings from '../../../../../templates/common/snippets/settingsLink'
import { invalidView } from '../../../../../templates/workspace/views/invalidView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: invalidView()', () => {
  test('Renders the base view', () => {
    const result = invalidView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('class="view invalid"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>')
  })

  test('Renders a settings link', () => {
    const spy = sinon.spy(settings, 'settingsLink')

    invalidView(getMockState(), getMockRenderVars())

    sinon.assert.callCount(spy, 1)
    spy.restore()
  })

  test('Renders a generic error', () => {
    const result = invalidView(getMockState(), getMockRenderVars())

    expect(result).contains('Something went wrong whilst collecting workspaces')
  })

  test('Renders an invalid-folder error', () => {
    const result = invalidView(
      getMockState({ invalidReason: 'invalid-folder' }),
      getMockRenderVars()
    )

    expect(result).contains('Folder path is not a directory')
  })

  test('Renders a no-workspaces error', () => {
    const result = invalidView(
      getMockState({ invalidReason: 'no-workspaces' }),
      getMockRenderVars({ depth: 1 })
    )

    expect(result).contains('Folder contains no workspaces')
    expect(result).contains('Try increasing the search depth or change the folder path.')
    expect(result).not.contains(
      'The current search depth is 0, this means that only the root workspace folder will be searched in for workspace files.'
    )
  })

  test('Renders a no-workspaces error (zero depth)', () => {
    const result = invalidView(
      getMockState({ invalidReason: 'no-workspaces' }),
      getMockRenderVars({ depth: 0 })
    )

    expect(result).contains('Folder contains no workspaces')
    expect(result).contains('Try increasing the search depth or change the folder path.')
    expect(result).contains(
      'The current search depth is 0, this means that only the root workspace folder will be searched in for workspace files.'
    )
  })
})
