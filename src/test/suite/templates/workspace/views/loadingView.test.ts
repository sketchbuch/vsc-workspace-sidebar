import { expect } from 'chai'
import * as sinon from 'sinon'
import * as folders from '../../../../../config/folders'
import * as links from '../../../../../templates/common/snippets/viewLink'
import { loadingView } from '../../../../../templates/workspace/views/loadingView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: loadingView()', () => {
  let vlSpy: sinon.SinonSpy
  let excludedHiddenConfigStub: sinon.SinonStub

  setup(() => {
    excludedHiddenConfigStub = sinon
      .stub(folders, 'getExcludeHiddenFoldersConfig')
      .callsFake(() => true)
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    vlSpy.restore()
    excludedHiddenConfigStub.restore()
  })

  test('Renders common content', () => {
    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('class="view loading"')
    expect(result).contains('class="view__message-title"')
    expect(result).contains(
      '<span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>'
    )
    expect(result).contains('Collecting workspaces...')
  })

  test('Renders as expected if excluding hidden folders.', () => {
    excludedHiddenConfigStub.callsFake(() => true)
    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('If this is taking a long time, try and exclude')

    sinon.assert.callCount(vlSpy, 1)
  })

  test('Renders as expected if including hidden folders.', () => {
    excludedHiddenConfigStub.callsFake(() => false)
    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('If this is taking a long time, try and exclude')
    expect(result).contains(' or ')

    sinon.assert.callCount(vlSpy, 3)
  })
})
