import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import {
  getExcludedFoldersConfig,
  getExcludeHiddenFoldersConfig,
  getFoldersConfig,
  getRawFoldersConfig,
} from '../../../config/folders'
import {
  CONFIG_DEPTH,
  CONFIG_DEPTH_MAX,
  CONFIG_DEPTH_MIN,
  CONFIG_EXCLUDE_HIDDEN_FODLERS,
  CONFIG_EXCLUDED_FOLDERS,
  CONFIG_FOLDERS,
} from '../../../constants/config'
import { ROOT_FOLDER_PATH } from '../../mocks/mockFileData'

suite('Config > Folders:', () => {
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

  test('getRawFoldersConfig() returns config for the old folder url if no rootFolders', () => {
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

    expect(getRawFoldersConfig()).to.eql([
      {
        path: ROOT_FOLDER_PATH,
      },
    ])
  })

  test('getRawFoldersConfig() returns config for rootFolders', () => {
    const rootFolders = [
      { path: '~/Temp/', depth: -1, excludeHiddenFolders: false },
      { path: '~/Öffentlich/VM Dev', depth: 26 },
      { path: '/~/Notes', depth: 2 },
      { path: '~/Dev' },
      { path: '~/Öffentlich/VM Dev', depth: 10, excludeHiddenFolders: false },
    ]

    stub.callsFake(() => {
      return {
        get: (section: string) => {
          if (section === 'workspaceSidebar.rootFolders') {
            return rootFolders
          }

          return undefined
        },
      } as WorkspaceConfiguration
    })

    expect(getRawFoldersConfig()).to.eql(rootFolders)
  })
})
