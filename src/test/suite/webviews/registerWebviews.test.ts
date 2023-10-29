import { expect } from 'chai'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import * as treeConfigs from '../../../config/treeview'
import { FS_WS_EXT } from '../../../constants/fs'
import {
  configOptions,
  refreshConfigOptions,
  rerenderConfigOptions,
  searchConfigOptions,
  treeConfigOptions,
  visibleFilesConfigOptions,
  WS_CONFIG,
} from '../../../webviews/configOptions'
import { registerWebviews } from '../../../webviews/registerWebviews'
import { WorkspaceViewProvider } from '../../../webviews/Workspace/WorkspaceViewProvider'
import { getMockContext } from '../../mocks/mockContext'
import { getMockUri } from '../../mocks/mockExtensionUri'
import { mockThemeDataProvider } from '../../mocks/mockThemeDataProvider'

// TODO - Add test for explorer compact folders
suite('Webviews > registerWebviews()', () => {
  let configStub: sinon.SinonStub
  let mockContext: vscode.ExtensionContext
  let refreshSpy: sinon.SinonSpy
  let regWebviewStub: sinon.SinonStub
  let tdpSpy: sinon.SinonSpy
  let ws: WorkspaceViewProvider

  setup(() => {
    tdpSpy = sinon.spy(mockThemeDataProvider, 'subscribe')
    ws = new WorkspaceViewProvider(mockContext, mockThemeDataProvider)

    configStub = sinon.stub(vscode.workspace, 'onDidChangeConfiguration')
    mockContext = getMockContext()
    refreshSpy = sinon.spy(ws, 'refresh')
    regWebviewStub = sinon.stub(vscode.window, 'registerWebviewViewProvider')
  })

  teardown(() => {
    configStub.restore()
    refreshSpy.restore()
    regWebviewStub.restore()
    tdpSpy.restore()
  })

  const callChangeConfigCallaback = (affectsConfiguration: (section: string) => boolean) => {
    const changeConfigCallBack = configStub.getCalls()[0].args[0]

    changeConfigCallBack({
      affectsConfiguration,
    } as vscode.ConfigurationChangeEvent)
  }

  const getAffectsConfigSpy = (configKey: string) => {
    return sinon.spy(
      (configPath: string) => configPath === configKey || configPath.includes(WS_CONFIG)
    )
  }

  const getConfigOptions = (optionWanted: string) => {
    const configOpt = configOptions.find((opt) => opt.config.includes(optionWanted))

    return configOpt ? [configOpt] : []
  }

  const testRefreshOption = (opt: string, isRerender: boolean) => {
    test(opt, () => {
      const affectsConfigSpy = getAffectsConfigSpy(opt)
      const configOpts = getConfigOptions(opt)

      registerWebviews(mockContext, ws, configOpts)
      callChangeConfigCallaback(affectsConfigSpy)

      sinon.assert.callCount(affectsConfigSpy, 2) // Check for WS_CONFIG and CONFIG_OPTION
      sinon.assert.callCount(refreshSpy, 1)
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(isRerender)
    })
  }

  test('Sets up webview as expected', () => {
    const createStub = sinon.stub(vscode.workspace, 'onDidCreateFiles')

    registerWebviews(mockContext, ws, configOptions)

    expect(mockContext.subscriptions).to.have.length(3)
    sinon.assert.callCount(configStub, 1)
    sinon.assert.callCount(createStub, 1)
    sinon.assert.callCount(regWebviewStub, 1)
    sinon.assert.callCount(tdpSpy, 1)

    createStub.restore()
  })

  suite('Refresh config options:', () => {
    refreshConfigOptions.forEach((opt) => {
      testRefreshOption(opt.config, false)
    })
  })

  suite('Rerender config options:', () => {
    rerenderConfigOptions.forEach((opt) => {
      testRefreshOption(opt.config, true)
    })
  })

  suite('Search config options:', () => {
    let searchSpy: sinon.SinonSpy

    setup(() => {
      searchSpy = sinon.spy(ws, 'updateSearch')
    })

    teardown(() => {
      searchSpy.restore()
    })

    const testOption = (opt: string) => {
      test(opt, () => {
        const affectsConfigSpy = getAffectsConfigSpy(opt)
        const configOpts = getConfigOptions(opt)

        registerWebviews(mockContext, ws, configOpts)
        callChangeConfigCallaback(affectsConfigSpy)

        sinon.assert.callCount(searchSpy, 1)
        sinon.assert.callCount(searchSpy, 1)
      })
    }

    searchConfigOptions.forEach((opt) => {
      testOption(opt.config)
    })
  })

  suite('Visible files config options:', () => {
    let updateVisibleSpy: sinon.SinonSpy

    setup(() => {
      updateVisibleSpy = sinon.spy(ws, 'updateVisibleFiles')
    })

    teardown(() => {
      updateVisibleSpy.restore()
    })

    const testOption = (opt: string) => {
      test(opt, () => {
        const affectsConfigSpy = getAffectsConfigSpy(opt)
        const configOpts = getConfigOptions(opt)

        registerWebviews(mockContext, ws, configOpts)
        callChangeConfigCallaback(affectsConfigSpy)

        sinon.assert.callCount(affectsConfigSpy, 2) // Check for WS_CONFIG and opt
        sinon.assert.callCount(updateVisibleSpy, 1)
      })
    }

    visibleFilesConfigOptions.forEach((opt) => {
      testOption(opt.config)
    })
  })

  suite('Tree config options:', () => {
    let treeConfigStub: sinon.SinonStub
    let updateTreeSpy: sinon.SinonSpy

    setup(() => {
      treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
      updateTreeSpy = sinon.spy(ws, 'updateFileTree')
    })

    teardown(() => {
      treeConfigStub.restore()
      updateTreeSpy.restore()
    })

    const testOption = (opt: string, isTree: boolean) => {
      test(`${opt} - ${isTree ? 'Tree' : 'Flat List'}`, () => {
        treeConfigStub.callsFake(() => isTree)

        const affectsConfigSpy = getAffectsConfigSpy(opt)
        const configOpts = getConfigOptions(opt)

        registerWebviews(mockContext, ws, configOpts)
        callChangeConfigCallaback(affectsConfigSpy)

        sinon.assert.callCount(affectsConfigSpy, 2) // Check for WS_CONFIG and CONFIG_OPTION
        sinon.assert.callCount(updateTreeSpy, isTree ? 1 : 0)
      })
    }

    treeConfigOptions.forEach((opt) => {
      testOption(opt.config, false)
      testOption(opt.config, true)
    })
  })

  suite('Creating a workspace file:', () => {
    let createSpy: sinon.SinonSpy

    setup(() => {
      createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles')
    })

    teardown(() => {
      createSpy.restore()
    })

    const callCreateCallaback = (files: vscode.Uri[]) => {
      const eventCallback = createSpy.getCalls()[0].args[0]
      eventCallback({
        files,
      } as vscode.FileCreateEvent)
    }

    test('Calls refresh() if a file is a code-workspace file', () => {
      registerWebviews(mockContext, ws, configOptions)
      callCreateCallaback([getMockUri(FS_WS_EXT)])

      sinon.assert.callCount(refreshSpy, 1)
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined)
    })

    test('Does NOT call refresh() if no file is a code-workspace file', () => {
      registerWebviews(mockContext, ws, configOptions)
      callCreateCallaback([getMockUri()])

      sinon.assert.callCount(refreshSpy, 0)
    })
  })
})
