import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { registerCommands, SortIds } from '../../../commands/registerCommands';
import {
  CMD_COLLAPSE,
  CMD_EXPAND,
  CMD_FOCUS_SEARCH,
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_REFRESH,
  CMD_SORT,
  CMD_VSC_OPEN_WS,
} from '../../../constants/commands';
import { WorkspaceViewProvider } from '../../../webviews/Workspace/WorkspaceViewProvider';
import { getMockContext } from '../../mocks/mockContext';

suite('Commands > registerCommands()', () => {
  const FILE = '/a/file';
  let execCmdStub: sinon.SinonStub;
  let mockContext = getMockContext();
  let regCmdStub: sinon.SinonStub;
  let ws: WorkspaceViewProvider;

  setup(() => {
    execCmdStub = sinon.stub(vscode.commands, 'executeCommand');
    mockContext = getMockContext();
    regCmdStub = sinon.stub(vscode.commands, 'registerCommand');
    ws = new WorkspaceViewProvider(mockContext.extensionUri, mockContext.globalState);
  });

  teardown(() => {
    execCmdStub.restore();
    regCmdStub.restore();
  });

  test('Regsiters the correct commands', () => {
    const CMD_COUNT = 7;
    registerCommands(mockContext, ws);

    expect(mockContext.subscriptions).to.have.length(CMD_COUNT);
    sinon.assert.callCount(regCmdStub, CMD_COUNT);
  });

  test('CMD_OPEN_CUR_WIN behaves as expected', () => {
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[0];
    const callback = regCall.args[1];
    callback(FILE);
    expect(regCall.args[0]).to.equal(CMD_OPEN_CUR_WIN);

    const execCall = execCmdStub.getCalls()[0];
    expect(execCall.args[0]).to.equal(CMD_VSC_OPEN_WS);
    expect(execCall.args[1].path).to.equal(FILE);
    expect(execCall.args[2]).to.equal(false);
  });

  test('CMD_OPEN_NEW_WIN behaves as expected', () => {
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[1];
    const callback = regCall.args[1];
    callback(FILE);
    expect(regCall.args[0]).to.equal(CMD_OPEN_NEW_WIN);

    const execCall = execCmdStub.getCalls()[0];
    expect(execCall.args[0]).to.equal(CMD_VSC_OPEN_WS);
    expect(execCall.args[1].path).to.equal(FILE);
    expect(execCall.args[2]).to.equal(true);
  });

  test('CMD_REFRESH behaves as expected', () => {
    const wsSpy = sinon.spy(ws, 'refresh');
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[2];
    const callback = regCall.args[1];
    callback();
    expect(regCall.args[0]).to.equal(CMD_REFRESH);
    sinon.assert.callCount(wsSpy, 1);

    wsSpy.restore();
  });

  suite('CMD_SORT:', () => {
    const testSort = (curSort: SortIds, newSort: SortIds) => {
      let title = `Calls refresh() if "${curSort}" and "${newSort}" is picked`;

      if (curSort === newSort) {
        title = `Does NOT call refresh() if "${curSort}" and "${newSort}" is picked`;
      }

      test(title, async () => {
        const globalGetStub = sinon.stub(mockContext.globalState, 'get').returns(curSort);
        const globalUpdateSpy = sinon.spy(mockContext.globalState, 'update');

        const description = newSort === 'ascending' ? 'Sort from a-z' : 'Sort from z-a';
        const label = newSort === 'ascending' ? 'Ascending' : 'Descending';

        const qpStub = sinon
          .stub(vscode.window, 'showQuickPick')
          .returns(Promise.resolve({ description, id: newSort, label }));
        const wsSpy = sinon.spy(ws, 'updateSort');
        registerCommands(mockContext, ws);

        const regCall = regCmdStub.getCalls()[3];
        const callback = regCall.args[1];
        await callback();
        expect(regCall.args[0]).to.equal(CMD_SORT);

        if (curSort === newSort) {
          sinon.assert.callCount(globalGetStub, 1);
          sinon.assert.callCount(globalUpdateSpy, 0);
          sinon.assert.callCount(qpStub, 1);
          sinon.assert.callCount(wsSpy, 0);
        } else {
          sinon.assert.callCount(globalGetStub, 2);
          sinon.assert.callCount(globalUpdateSpy, 1);
          sinon.assert.callCount(qpStub, 1);
          sinon.assert.callCount(wsSpy, 1);
        }

        globalGetStub.restore();
        globalUpdateSpy.restore();
        qpStub.restore();
        wsSpy.restore();
      });
    };

    testSort('ascending', 'descending');
    testSort('descending', 'ascending');
    testSort('ascending', 'ascending');
    testSort('descending', 'descending');
  });

  test('CMD_FOCUS_SEARCH behaves as expected', () => {
    const wsSpy = sinon.spy(ws, 'focusInput');
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[4];
    const callback = regCall.args[1];
    callback();
    expect(regCall.args[0]).to.equal(CMD_FOCUS_SEARCH);
    sinon.assert.callCount(wsSpy, 1);

    wsSpy.restore();
  });

  test('CMD_COLLAPSE behaves as expected', () => {
    const wsSpy = sinon.spy(ws, 'toggleAllFolders');
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[5];
    const callback = regCall.args[1];
    callback();
    expect(regCall.args[0]).to.equal(CMD_COLLAPSE);
    sinon.assert.callCount(wsSpy, 1);
    expect(wsSpy.args[0][0]).to.equal('collapse');

    wsSpy.restore();
  });

  test('CMD_EXPAND behaves as expected', () => {
    const wsSpy = sinon.spy(ws, 'toggleAllFolders');
    registerCommands(mockContext, ws);

    const regCall = regCmdStub.getCalls()[6];
    const callback = regCall.args[1];
    callback();
    expect(regCall.args[0]).to.equal(CMD_EXPAND);
    sinon.assert.callCount(wsSpy, 1);
    expect(wsSpy.args[0][0]).to.equal('expand');

    wsSpy.restore();
  });
});
