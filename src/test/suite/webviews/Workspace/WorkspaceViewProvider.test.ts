/* import sinon from 'sinon';
import * as vscode from 'vscode';
import { store } from '../../../../store/redux';
import * as templates from '../../../../templates/getHtml';
import { WorkspaceViewProvider } from '../../../../webviews';
import { getMockContext, getMockWebviewView } from '../../../mocks';

suite('Webviews > Workspace > WorkspaceViewProvider():', () => {
  let mockContext = getMockContext();
  let ws: WorkspaceViewProvider;
  let getHtmlSpy: sinon.SinonSpy;
  let callCount = 3;

  setup(() => {
    mockContext = getMockContext();
    getHtmlSpy = sinon.spy(templates, 'getHtml');
    ws = new WorkspaceViewProvider(mockContext.extensionUri, mockContext.globalState);
  });

  teardown(() => {
    getHtmlSpy.restore();
  });

  test('refresh() - Rerender', () => {
    ws.resolveWebviewView(getMockWebviewView());
    ws.refresh(true);

    sinon.assert.callCount(getHtmlSpy, callCount); // 2 from resolveWebviewView, 1 from refresh
    callCount += 3;
  });

  test('refresh() - Refetch', () => {
    const dispatchSpy = sinon.spy(store, 'dispatch');
    const execSpy = sinon.spy(vscode.commands, 'executeCommand');
    const gsSpy = sinon.spy(mockContext.globalState, 'update');

    ws.resolveWebviewView(getMockWebviewView());
    ws.refresh();

    sinon.assert.callCount(dispatchSpy, 3); // 1 from resolveWebviewView, 1 from updateSort, 1 from refresh
    sinon.assert.callCount(execSpy, 1);
    sinon.assert.callCount(getHtmlSpy, callCount); // 2 from resolveWebviewView, 1 from refresh
    sinon.assert.callCount(gsSpy, 1);

    dispatchSpy.restore();
    execSpy.restore();
    gsSpy.restore();
    callCount += 6;
  });
});
 */
