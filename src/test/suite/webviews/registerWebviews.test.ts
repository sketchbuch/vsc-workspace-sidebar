import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { FS_WS_EXT } from '../../../constants';
import { registerWebviews, WorkspaceViewProvider } from '../../../webviews';
import { getMockUri, mockContext } from '../../mocks';

suite.only('Webviews > registerWebviews()', () => {
  let regWebviewStub: sinon.SinonStub;
  let ws: WorkspaceViewProvider;
  let configStub: sinon.SinonStub;

  setup(() => {
    configStub = sinon.stub(vscode.workspace, 'onDidChangeConfiguration');
    regWebviewStub = sinon.stub(vscode.window, 'registerWebviewViewProvider');
    ws = new WorkspaceViewProvider(mockContext.extensionUri, mockContext.globalState);
  });

  teardown(() => {
    configStub.restore();
    regWebviewStub.restore();
  });

  test('Sets up webview as expected', () => {
    const createStub = sinon.stub(vscode.workspace, 'onDidCreateFiles');

    registerWebviews(mockContext, ws);

    expect(mockContext.subscriptions).to.have.length(3);
    sinon.assert.callCount(configStub, 1);
    sinon.assert.callCount(createStub, 1);
    sinon.assert.callCount(regWebviewStub, 1);

    createStub.restore();
  });

  suite('Configuration changes call refresh() correctly:', () => {
    let wsSpy: sinon.SinonSpy;

    setup(() => {
      wsSpy = sinon.spy(ws, 'refresh');
    });

    teardown(() => {
      wsSpy.restore();
    });

    test('workspaceSidebar.depth', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.depth'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 1);
      sinon.assert.callCount(wsSpy, 1);
      expect(wsSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('workspaceSidebar.folder', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.folder'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 2);
      sinon.assert.callCount(wsSpy, 1);
      expect(wsSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('workspaceSidebar.showPaths', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.showPaths'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 3);
      sinon.assert.callCount(wsSpy, 1);
      expect(wsSpy.getCalls()[0].args[0]).to.equal(true);
    });
  });

  suite('Creating a workspace file:', () => {
    test('Calls refresh() if a file is a code-workspace file', () => {
      const wsSpy = sinon.spy(ws, 'refresh');
      const createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles');

      registerWebviews(mockContext, ws);
      const eventCallback = createSpy.getCalls()[0].args[0];
      eventCallback({
        files: [getMockUri(FS_WS_EXT)],
      } as vscode.FileCreateEvent);

      sinon.assert.callCount(wsSpy, 1);
      expect(wsSpy.getCalls()[0].args[0]).to.equal(undefined);

      createSpy.restore();
    });

    test('Does NOT call refresh() if no file is a code-workspace file', () => {
      const wsSpy = sinon.spy(ws, 'refresh');
      const createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles');

      registerWebviews(mockContext, ws);
      const eventCallback = createSpy.getCalls()[0].args[0];
      eventCallback({
        files: [getMockUri()],
      } as vscode.FileCreateEvent);

      sinon.assert.callCount(wsSpy, 0);

      createSpy.restore();
    });
  });
});
