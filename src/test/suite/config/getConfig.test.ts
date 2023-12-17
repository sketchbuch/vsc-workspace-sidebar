import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import { getExplorerCompactFoldersConfig, getFileiconThemeConfig } from '../../../config/core'
import { getExcludeHiddenFoldersConfig } from '../../../config/folders'
import {
  getActionsConfig,
  getCleanLabelsConfig,
  getDepthConfig,
  getShowFileiconConfig,
  getShowFileiconsConfigConfig,
} from '../../../config/general'
import { getShowPathsConfig } from '../../../config/listview'
import { getSearchMinConfig } from '../../../config/search'
import { getCondenseFileTreeConfig, getShowTreeConfig } from '../../../config/treeview'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_EXCLUDE_HIDDEN_FODLERS,
  CONFIG_EXPLORER_COMPACT_FOLDERS,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  CONFIG_SHOW_HIERARCHY,
  ConfigActions,
  ConfigShowPaths,
} from '../../../constants/config'

// Reenable once stub is working
suite.skip('Config > getConfig:', () => {
  let stub: sinon.SinonStub

  setup(() => {
    stub = sinon.stub(workspace, 'getConfiguration').callsFake(() => {
      return {
        get: (section: string) => {
          return undefined
        },
      } as WorkspaceConfiguration
    })
  })

  teardown(() => {
    stub.restore()
  })

  // TODO - add test for explorer compact folders getter

  test('getActionsConfig() returns the default if no config value is set', () => {
    expect(getActionsConfig()).to.equal(ConfigActions.CURRENT_WINDOW)
  })

  test('getCleanLabelsConfig() returns the default if no config value is set', () => {
    expect(getCleanLabelsConfig()).to.equal(CONFIG_CLEAN_LABELS)
  })

  test('getCondenseFileTreeConfig() returns the default if no config value is set', () => {
    expect(getCondenseFileTreeConfig()).to.equal(CONFIG_CONDENSE_FILETREE)
  })

  test('getDepthConfig() returns the default if no config value is set', () => {
    expect(getDepthConfig()).to.equal(CONFIG_DEPTH)
  })

  test('getSearchMinConfig() returns the default if no config value is set', () => {
    expect(getSearchMinConfig()).to.equal(CONFIG_SEARCH_MINIMUM)
  })

  test('getShowPathsConfig() returns the default if no config value is set', () => {
    expect(getShowPathsConfig()).to.equal(ConfigShowPaths.NEVER)
  })

  test('getShowTreeConfig() returns the default if no config value is set', () => {
    expect(getShowTreeConfig()).to.equal(CONFIG_SHOW_HIERARCHY)
  })

  test('getShowFileiconConfig() returns the default if no config value is set', () => {
    expect(getShowFileiconConfig()).to.equal(CONFIG_SHOW_FILE_ICONS)
  })

  test('getShowFileiconsConfigConfig() returns the default if no config value is set', () => {
    expect(getShowFileiconsConfigConfig()).to.equal(CONFIG_SHOW_FILE_ICONS_CONFIG)
  })

  test('getExplorerCompactFoldersConfig() returns the default if no config value is set', () => {
    expect(getExplorerCompactFoldersConfig()).to.equal(CONFIG_EXPLORER_COMPACT_FOLDERS)
  })

  test('getFileiconThemeConfig() returns the default if no config value is set', () => {
    expect(getFileiconThemeConfig()).to.equal('vs-seti')
  })

  test('getExcludeHiddenFoldersConfig() returns the default if no config value is set', () => {
    expect(getExcludeHiddenFoldersConfig()).to.equal(CONFIG_EXCLUDE_HIDDEN_FODLERS)
  })
})
