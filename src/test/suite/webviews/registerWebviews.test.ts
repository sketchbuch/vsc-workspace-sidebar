import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as configs from '../../../config/getConfig';
import { FS_WS_EXT } from '../../../constants/fs';
import { configOptions, WS_CONFIG } from '../../../webviews/configOptions';
import { registerWebviews } from '../../../webviews/registerWebviews';
import { WorkspaceViewProvider } from '../../../webviews/Workspace/WorkspaceViewProvider';
import { getMockContext } from '../../mocks/mockContext';
import { getMockUri } from '../../mocks/mockExtensionUri';

suite('Webviews > registerWebviews()', () => {
  let configStub: sinon.SinonStub;
  let mockContext: vscode.ExtensionContext;
  let refreshSpy: sinon.SinonSpy;
  let regWebviewStub: sinon.SinonStub;
  let ws: WorkspaceViewProvider;

  setup(() => {
    configStub = sinon.stub(vscode.workspace, 'onDidChangeConfiguration');
    mockContext = getMockContext();
    regWebviewStub = sinon.stub(vscode.window, 'registerWebviewViewProvider');
    ws = new WorkspaceViewProvider(mockContext.extensionUri, mockContext.globalState);
    refreshSpy = sinon.spy(ws, 'refresh');
  });

  teardown(() => {
    configStub.restore();
    refreshSpy.restore();
    regWebviewStub.restore();
  });

  const callChangeConfigCallaback = (affectsConfiguration: (section: string) => boolean) => {
    const changeConfigCallBack = configStub.getCalls()[0].args[0];

    changeConfigCallBack({
      affectsConfiguration,
    } as vscode.ConfigurationChangeEvent);
  };

  const getAffectsConfigSpy = (configKey: string) => {
    return sinon.spy(
      (configPath: string) =>
        configPath === `${WS_CONFIG}${configKey}` || configPath.includes(WS_CONFIG)
    );
  };

  const getConfigOptions = (optionWanted: string) => {
    const configOpt = configOptions.find((opt) => opt.config.includes(optionWanted));
    return configOpt ? [configOpt] : [];
  };

  test('Sets up webview as expected', () => {
    const createStub = sinon.stub(vscode.workspace, 'onDidCreateFiles');

    registerWebviews(mockContext, ws, configOptions);

    expect(mockContext.subscriptions).to.have.length(3);
    sinon.assert.callCount(configStub, 1);
    sinon.assert.callCount(createStub, 1);
    sinon.assert.callCount(regWebviewStub, 1);

    createStub.restore();
  });

  suite('Config changes that call refresh():', () => {
    const testOption = (opt: string, isRerender: boolean) => {
      test(`${WS_CONFIG}${opt}`, () => {
        const affectsConfigSpy = getAffectsConfigSpy(opt);
        const configOpts = getConfigOptions(opt);

        registerWebviews(mockContext, ws, configOpts);
        callChangeConfigCallaback(affectsConfigSpy);

        sinon.assert.callCount(affectsConfigSpy, 2); // Check for WS_CONFIG and CONFIG_OPTION
        sinon.assert.callCount(refreshSpy, 1);
        expect(refreshSpy.getCalls()[0].args[0]).to.equal(isRerender);
      });
    };

    [
      { opt: '.actions', isRerender: true },
      { opt: '.cleanLabels', isRerender: false },
      { opt: '.depth', isRerender: false },
      { opt: '.folder', isRerender: false },
      { opt: '.searchMinimum', isRerender: true },
    ].forEach((opt) => {
      testOption(opt.opt, opt.isRerender);
    });
  });

  suite('Config changes that call updateVisibleFiles():', () => {
    let updateVisibleSpy: sinon.SinonSpy;

    setup(() => {
      updateVisibleSpy = sinon.spy(ws, 'updateVisibleFiles');
    });

    teardown(() => {
      updateVisibleSpy.restore();
    });

    const testOption = (opt: string) => {
      test(`${WS_CONFIG}${opt}`, () => {
        const affectsConfigSpy = getAffectsConfigSpy(opt);
        const configOpts = getConfigOptions(opt);

        registerWebviews(mockContext, ws, configOpts);
        callChangeConfigCallaback(affectsConfigSpy);

        sinon.assert.callCount(affectsConfigSpy, 2); // Check for WS_CONFIG and opt
        sinon.assert.callCount(updateVisibleSpy, 1);
      });
    };

    ['.showFolderHierarchy', '.showPaths'].forEach((opt: string) => {
      testOption(opt);
    });
  });

  suite('Config changes that call updateFileTree():', () => {
    let treeConfigStub: sinon.SinonStub;
    let updateTreeSpy: sinon.SinonSpy;

    setup(() => {
      treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
      updateTreeSpy = sinon.spy(ws, 'updateFileTree');
    });

    teardown(() => {
      treeConfigStub.restore();
      updateTreeSpy.restore();
    });

    const testOption = (opt: string, isTree: boolean) => {
      test(`${WS_CONFIG}${opt} - ${isTree ? 'Tree' : 'Flat List'}`, () => {
        treeConfigStub.callsFake(() => isTree);

        const affectsConfigSpy = getAffectsConfigSpy(opt);
        const configOpts = getConfigOptions(opt);

        registerWebviews(mockContext, ws, configOpts);
        callChangeConfigCallaback(affectsConfigSpy);

        sinon.assert.callCount(affectsConfigSpy, 2); // Check for WS_CONFIG and CONFIG_OPTION
        sinon.assert.callCount(updateTreeSpy, isTree ? 1 : 0);
      });
    };

    const treeOptions = ['.condenseFileTree', '.showRootFolder'];

    treeOptions.forEach((opt: string) => {
      testOption(opt, false);
    });

    treeOptions.forEach((opt: string) => {
      testOption(opt, true);
    });
  });

  suite('Creating a workspace file:', () => {
    let createSpy: sinon.SinonSpy;

    setup(() => {
      createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles');
    });

    teardown(() => {
      createSpy.restore();
    });

    const callCreateCallaback = (files: vscode.Uri[]) => {
      const eventCallback = createSpy.getCalls()[0].args[0];
      eventCallback({
        files,
      } as vscode.FileCreateEvent);
    };

    test('Calls refresh() if a file is a code-workspace file', () => {
      registerWebviews(mockContext, ws, configOptions);
      callCreateCallaback([getMockUri(FS_WS_EXT)]);

      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('Does NOT call refresh() if no file is a code-workspace file', () => {
      registerWebviews(mockContext, ws, configOptions);
      callCreateCallaback([getMockUri()]);

      sinon.assert.callCount(refreshSpy, 0);
    });
  });
});
