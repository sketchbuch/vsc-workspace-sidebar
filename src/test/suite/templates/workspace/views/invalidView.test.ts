import { expect } from 'chai'
import { invalidView } from '../../../../../templates/workspace/views/invalidView'
import { FindFileResult } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: invalidView()', () => {
  const results: FindFileResult[] = [
    'is-file',
    'is-hidden-excluded',
    'no-root-folders',
    'no-workspaces',
    'nonexistent',
    'ok',
  ]
  const mockRenderVars = getMockRenderVars()

  test('Renders the base view', () => {
    const result = invalidView(getMockState(), mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('class="view invalid"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>')
  })

  results.forEach((res) => {
    test(`"${res}" renders as expected`, () => {
      const result = invalidView(getMockState({ result: res }), mockRenderVars)

      expect(result).contains(`data-type="${res}"`)
      expect(result).contains('view__message-title')
      expect(result).contains('view__message-description')
    })
  })

  test('"no-workspaces" description count is 2 if depth is 0', () => {
    const mockRootFolders = getMockRootFolders()
    const regex = /view__message-description/g
    const state = getMockState({ ...mockRootFolders, result: 'no-workspaces' })

    state.workspaceData[0].depth = 0

    const count = (invalidView(state, mockRenderVars).match(regex) || []).length
    expect(count).to.equal(2)
  })

  test('"no-workspaces" description count is 1 if depth is >= 1', () => {
    const mockRootFolders = getMockRootFolders()
    const regex = /view__message-description/g
    const state = getMockState({ ...mockRootFolders, result: 'no-workspaces' })

    state.workspaceData[0].depth = 1

    const count = (invalidView(state, mockRenderVars).match(regex) || []).length
    expect(count).to.equal(1)
  })
})
