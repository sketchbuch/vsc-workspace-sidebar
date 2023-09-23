import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as sinon from 'sinon'
import { getHtml } from '../../../templates/getHtml'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { GetHtml, GetHtmlTemplateFunc } from '../../../webviews/webviews.interface'
import { mockExtensionUri } from '../../mocks/mockExtensionUri'
import { mockFsStructure } from '../../mocks/mockFsStructure'
import { getMockState } from '../../mocks/mockState'
import { getMockTemplateVars } from '../../mocks/mockTemplateVars'
import { getMockThemeData } from '../../mocks/mockThemeData'
import { mockWebView } from '../../mocks/mockWebview'

suite('Templates > getHtml()', () => {
  const mockState = getMockState()
  const mockTemplateReturn = 'this is the content'
  const nonce = 'testnonce'

  const getGetHtml = (template: GetHtmlTemplateFunc<WorkspaceState>): GetHtml<WorkspaceState> => {
    return {
      cssData: null,
      extensionPath: mockExtensionUri,
      htmlData: {
        state: mockState,
        title: 'Workspaces',
        webview: mockWebView,
      },
      template,
      themeData: getMockThemeData(),
    }
  }

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  test('Returns expected string', () => {
    const stub = sinon.stub()
    stub.returns(mockTemplateReturn)
    const result = getHtml<WorkspaceState>(getGetHtml(stub), nonce)

    expect(result).to.be.a('string')
    expect(result).to.equal(mockTemplateReturn)

    sinon.assert.callCount(stub, 1)
    expect(stub.getCalls()[0].args[0]).to.eql(getMockTemplateVars({ nonce }, true))
    expect(stub.getCalls()[0].args[1]).to.equal(mockState)
    stub.reset()
  })
})
