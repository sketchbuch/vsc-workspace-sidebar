import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import {
  getActionsConfig,
  getCleanLabelsConfig,
  getDepthConfig,
  getFocusExplorerConfig,
  getShowFileiconConfig,
  getShowFileiconsConfigConfig,
} from '../../../config/general'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_DEPTH,
  CONFIG_FOCUS_EXPLORER,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  ConfigActions,
} from '../../../constants/config'

suite('Config > General:', () => {
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

  test('getDepthConfig() returns the default if no config value is set', () => {
    expect(getDepthConfig()).to.equal(CONFIG_DEPTH)
  })

  test('getFocusExplorerConfig() returns the default if no config value is set', () => {
    expect(getFocusExplorerConfig()).to.equal(CONFIG_FOCUS_EXPLORER)
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
})
