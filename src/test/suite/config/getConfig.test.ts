import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import { getExplorerCompactFoldersConfig, getFileiconThemeConfig } from '../../../config/core'
import {
  getExcludedFoldersConfig,
  getExcludeHiddenFoldersConfig,
  getFoldersConfig,
} from '../../../config/folders'
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
  CONFIG_DEPTH_MAX,
  CONFIG_DEPTH_MIN,
  CONFIG_EXCLUDE_HIDDEN_FODLERS,
  CONFIG_EXCLUDED_FOLDERS,
  CONFIG_EXPLORER_COMPACT_FOLDERS,
  CONFIG_FOLDERS,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  CONFIG_SHOW_HIERARCHY,
  ConfigActions,
  ConfigShowPaths,
} from '../../../constants/config'
import { DEFAULT_THEME } from '../../../theme/constants'
import { ROOT_FOLDER_PATH } from '../../mocks/mockFileData'

suite('Config > getConfig:', () => {
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
    expect(getShowFileiconsConfigConfig()).to.eql(CONFIG_SHOW_FILE_ICONS_CONFIG)
  })

  test('getShowFileiconsConfigConfig() returns config with duplicate values removed', () => {
    stub.callsFake(() => {
      return {
        get: (section: string) => {
          if (section === 'workspaceSidebar.showFileIconsConfig') {
            return {
              dart: ['flutter'],
              html: ['ea'],
              ts: ['vscode', 'electron', 'vscode'],
            }
          }

          return undefined
        },
      } as WorkspaceConfiguration
    })

    expect(getShowFileiconsConfigConfig()).to.eql({
      dart: ['flutter'],
      html: ['ea'],
      ts: ['vscode', 'electron'],
    })
  })

  test('getExplorerCompactFoldersConfig() returns the default if no config value is set', () => {
    expect(getExplorerCompactFoldersConfig()).to.equal(CONFIG_EXPLORER_COMPACT_FOLDERS)
  })

  test('getFileiconThemeConfig() returns the default if no config value is set', () => {
    stub.callsFake(() => {
      return {
        get: (section: string) => {
          return DEFAULT_THEME
        },
      } as WorkspaceConfiguration
    })

    expect(getFileiconThemeConfig()).to.equal(DEFAULT_THEME)
  })

  test('getExcludeHiddenFoldersConfig() returns the default if no config value is set', () => {
    expect(getExcludeHiddenFoldersConfig()).to.equal(CONFIG_EXCLUDE_HIDDEN_FODLERS)
  })

  test('getExcludedFoldersConfig() returns the default if no config value is set', () => {
    expect(getExcludedFoldersConfig()).to.eql(CONFIG_EXCLUDED_FOLDERS)
  })

  test('getExcludedFoldersConfig() returns config folders with duplicates removed', () => {
    stub.callsFake(() => {
      return {
        get: (section: string) => {
          if (section === 'workspaceSidebar.folders.excluded') {
            return ['node_modules', 'build', '.cache', '.git', 'node_modules']
          }

          return undefined
        },
      } as WorkspaceConfiguration
    })

    expect(getExcludedFoldersConfig()).to.eql(['node_modules', 'build', '.cache', '.git'])
  })

  test('getFoldersConfig() returns the default if no config value is set', () => {
    expect(getFoldersConfig()).to.eql(CONFIG_FOLDERS)
  })

  test('getFoldersConfig() returns config for the old folder url if no rootFolders', () => {
    stub.callsFake(() => {
      return {
        get: (section: string) => {
          if (section === 'workspaceSidebar.folder') {
            return ROOT_FOLDER_PATH
          }

          return undefined
        },
      } as WorkspaceConfiguration
    })

    expect(getFoldersConfig()).to.eql([
      {
        depth: CONFIG_DEPTH,
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        path: ROOT_FOLDER_PATH,
      },
    ])
  })

  test('getFoldersConfig() returns config, padded with default values as needed, duplicates removed, and paths cleaned', () => {
    stub.callsFake(() => {
      return {
        get: (section: string) => {
          if (section === 'workspaceSidebar.rootFolders') {
            return [
              { path: '~/Temp/', depth: -1, excludeHiddenFolders: false },
              { path: '~/Öffentlich/VM Dev', depth: 26 },
              { path: '/~/Notes', depth: 2 },
              { path: '~/Dev' },
              { path: '~/Öffentlich/VM Dev', depth: 10, excludeHiddenFolders: false },
            ]
          }

          return undefined
        },
      } as WorkspaceConfiguration
    })

    expect(getFoldersConfig()).to.eql([
      { path: '~/Temp', depth: CONFIG_DEPTH_MIN, excludeHiddenFolders: false },
      {
        path: '~/Öffentlich/VM Dev',
        depth: CONFIG_DEPTH_MAX,
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
      },
      { path: '~/Notes', depth: 2, excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS },
      { path: '~/Dev', depth: CONFIG_DEPTH, excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS },
    ])
  })
})
