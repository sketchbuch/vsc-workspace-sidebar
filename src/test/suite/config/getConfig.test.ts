import { expect } from 'chai';
import * as sinon from 'sinon';
import { workspace, WorkspaceConfiguration } from 'vscode';
import {
  getActionsConfig,
  getDepthConfig,
  getFolderConfig,
  getSearchMinConfig,
  getShowPathsConfig,
  getShowTreeConfig,
} from '../../../config/getConfig';
import {
  ConfigActions,
  ConfigShowPaths,
  CONFIG_DEPTH,
  CONFIG_FOLDER,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
} from '../../../constants/config';

suite('Config > getConfig:', () => {
  let stub: sinon.SinonStub;

  setup(() => {
    stub = getConfigStub();
  });

  teardown(() => {
    stub.restore();
  });

  const getConfigStub = () => {
    return sinon.stub(workspace, 'getConfiguration').callsFake(() => {
      return {
        get: (section: string) => undefined,
      } as WorkspaceConfiguration;
    });
  };

  test('getActionsConfig() returns the default if no config value is set', () => {
    expect(getActionsConfig()).to.equal(ConfigActions.CURRENT_WINDOW);
  });

  test('getDepthConfig() returns the default if no config value is set', () => {
    expect(getDepthConfig()).to.equal(CONFIG_DEPTH);
  });

  test('getFolderConfig() returns the default if no config value is set', () => {
    expect(getFolderConfig()).to.equal(CONFIG_FOLDER);
  });

  test('getSearchMinConfig() returns the default if no config value is set', () => {
    expect(getSearchMinConfig()).to.equal(CONFIG_SEARCH_MINIMUM);
  });

  test('getShowPathsConfig() returns the default if no config value is set', () => {
    expect(getShowPathsConfig()).to.equal(ConfigShowPaths.NEVER);
  });

  test('getShowTreeConfig() returns the default if no config value is set', () => {
    expect(getShowTreeConfig()).to.equal(CONFIG_SHOW_HIERARCHY);
  });
});
