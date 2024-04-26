import { expect } from 'chai'
import * as sinon from 'sinon'
import * as folders from '../../../../../config/folders'
import * as links from '../../../../../templates/common/snippets/viewLink'
import { loadingView } from '../../../../../templates/workspace/views/loadingView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: loadingView()', () => {
  let excludedHiddenConfigStub: sinon.SinonStub
  let foldersConfigStub: sinon.SinonStub
  let vlSpy: sinon.SinonSpy

  setup(() => {
    excludedHiddenConfigStub = sinon
      .stub(folders, 'getExcludeHiddenFoldersConfig')
      .callsFake(() => true)
    foldersConfigStub = sinon.stub(folders, 'getRawFoldersConfig').callsFake(() => [{ path: '' }])
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    excludedHiddenConfigStub.restore()
    foldersConfigStub.restore()
    vlSpy.restore()
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

    sinon.assert.callCount(vlSpy, 2)
  })

  test('Renders as expected if including hidden folders.', () => {
    excludedHiddenConfigStub.callsFake(() => false)
    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('If this is taking a long time, try and exclude')
    expect(result).contains(' or ')

    sinon.assert.callCount(vlSpy, 5)
  })

  test('Renders root folders msg if root folders contain depth', () => {
    foldersConfigStub.callsFake(() => [{ path: '', depth: 1 }])

    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('are overriding depth/excludeHiddenFolders settings')

    sinon.assert.callCount(vlSpy, 3)
  })

  test('Renders root folders msg if root folders contain excludeHiddenFolders', () => {
    foldersConfigStub.callsFake(() => [{ path: '', excludeHiddenFolders: true }])

    const result = loadingView(getMockState(), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).contains('are overriding depth/excludeHiddenFolders settings')

    sinon.assert.callCount(vlSpy, 3)
  })
})
