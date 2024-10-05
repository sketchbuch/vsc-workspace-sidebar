import sinon from 'sinon'
import * as vscode from 'vscode'
import { store } from '../../../../store/redux'
import * as templates from '../../../../templates/getHtml'
import { WorkspaceViewProvider } from '../../../../webviews/Workspace/WorkspaceViewProvider'
import { getMockContext } from '../../../mocks/mockContext'
import { mockThemeDataProvider } from '../../../mocks/mockThemeDataProvider'
import { getMockWebviewView } from '../../../mocks/mockWebview'

// TODO - Try and spy on the action creators.
suite('Webviews > Workspace > WorkspaceViewProvider():', () => {
  let mockContext = getMockContext()
  let dispatchSpy: sinon.SinonSpy
  let getHtmlSpy: sinon.SinonSpy
  let stateSpy: sinon.SinonStub
  let ws: WorkspaceViewProvider

  setup(() => {
    mockContext = getMockContext()
    dispatchSpy = sinon.spy(store, 'dispatch')
    getHtmlSpy = sinon.spy(templates, 'getHtml')
    stateSpy = sinon.stub(mockContext.globalState, 'get')
    ws = new WorkspaceViewProvider(mockContext, mockThemeDataProvider)
  })

  teardown(() => {
    dispatchSpy.restore()
    getHtmlSpy.restore()
    stateSpy.restore()
  })

  test('rerender() - Rerender', () => {
    ws.resolveWebviewView(getMockWebviewView())
    ws.rerender()

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)
  })

  test('refetch()', () => {
    const execCmdSpy = sinon.spy(vscode.commands, 'executeCommand')

    ws.resolveWebviewView(getMockWebviewView())
    ws.refetch()

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)
    sinon.assert.callCount(execCmdSpy, 1)

    execCmdSpy.restore()
  })

  test('updateFileTree()', () => {
    ws.resolveWebviewView(getMockWebviewView())
    ws.updateFileTree()

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)
  })

  test('updateVisibleFiles()', () => {
    //expect(store.getState().ws.fileTree).to.eql(null);

    ws.resolveWebviewView(getMockWebviewView())
    ws.updateVisibleFiles()

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)

    // TODO - some how change the file tree
  })

  test('toggleAllFolders()', () => {
    ws.resolveWebviewView(getMockWebviewView())
    ws.toggleAllFolders('collapse')

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)
  })

  test('resolveWebviewView()', () => {
    ws.resolveWebviewView(getMockWebviewView())

    sinon.assert.called(dispatchSpy)
    sinon.assert.called(getHtmlSpy)
  })
})
