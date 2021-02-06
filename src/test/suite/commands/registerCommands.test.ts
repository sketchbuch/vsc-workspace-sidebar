import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { registerCommands } from '../../../commands';
import { SortIds } from '../../../commands/registerCommands.interface';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_REFRESH,
  CMD_SORT,
  CMD_VSC_OPEN_WS,
} from '../../../constants';
import { WorkspaceViewProvider } from '../../../webviews';
import { getMockContext } from '../../mocks';

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
    registerCommands(mockContext, ws);

    expect(mockContext.subscriptions).to.have.length(4);
    sinon.assert.callCount(regCmdStub, 4);
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
        const qpStub = sinon.stub(vscode.window, 'showQuickPick').returns(
          Promise.resolve({
            description: t(`sort.${newSort}.description`),
            id: newSort,
            label: t(`sort.${newSort}.label`),
          })
        );
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
});
