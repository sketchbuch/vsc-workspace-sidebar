import { expect } from 'chai'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../config/core'
import * as generalConfigs from '../../../../config/general'
import * as searchConfigs from '../../../../config/search'
import * as treeConfigs from '../../../../config/treeview'
import {
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
  ConfigActions,
} from '../../../../constants/config'
import { getRenderVars } from '../../../../templates/helpers/getRenderVars'
import { DEFAULT_THEME } from '../../../../theme/constants'
import { getMockTemplateVars } from '../../../mocks/mockTemplateVars'
import { getMockThemeData } from '../../../mocks/mockThemeData'

suite('Templates > Helpers > getRenderVars():', () => {
  let actionsConfigStub: sinon.SinonStub
  let condenseFileTreeConfigStub: sinon.SinonStub
  let depthConfigStub: sinon.SinonStub
  let getFileIconThemeConfigStub: sinon.SinonStub
  let searchMinConfigStub: sinon.SinonStub
  let showFileIconConfigStub: sinon.SinonStub
  let showFileiconsConfigConfigStub: sinon.SinonStub
  let showRootConfigStub: sinon.SinonStub
  let showTreeConfigStub: sinon.SinonStub

  setup(() => {
    actionsConfigStub = sinon
      .stub(generalConfigs, 'getActionsConfig')
      .callsFake(() => ConfigActions.CURRENT_WINDOW)
    condenseFileTreeConfigStub = sinon
      .stub(treeConfigs, 'getCondenseFileTreeConfig')
      .callsFake(() => CONFIG_CONDENSE_FILETREE)
    depthConfigStub = sinon.stub(generalConfigs, 'getDepthConfig').callsFake(() => CONFIG_DEPTH)
    getFileIconThemeConfigStub = sinon
      .stub(coreConfigs, 'getFileiconThemeConfig')
      .callsFake(() => DEFAULT_THEME)
    searchMinConfigStub = sinon
      .stub(searchConfigs, 'getSearchMinConfig')
      .callsFake(() => CONFIG_SEARCH_MINIMUM)
    showFileIconConfigStub = sinon
      .stub(generalConfigs, 'getShowFileiconConfig')
      .callsFake(() => CONFIG_SHOW_FILE_ICONS)
    showFileiconsConfigConfigStub = sinon
      .stub(generalConfigs, 'getShowFileiconsConfigConfig')
      .callsFake(() => CONFIG_SHOW_FILE_ICONS_CONFIG)
    showRootConfigStub = sinon
      .stub(treeConfigs, 'getShowRootFolderConfig')
      .callsFake(() => CONFIG_SHOW_ROOT_FOLDER)
    showTreeConfigStub = sinon
      .stub(treeConfigs, 'getShowTreeConfig')
      .callsFake(() => CONFIG_SHOW_HIERARCHY)
  })

  teardown(() => {
    actionsConfigStub.restore()
    condenseFileTreeConfigStub.restore()
    depthConfigStub.restore()
    getFileIconThemeConfigStub.restore()
    searchMinConfigStub.restore()
    showFileIconConfigStub.restore()
    showFileiconsConfigConfigStub.restore()
    showRootConfigStub.restore()
    showTreeConfigStub.restore()
  })

  test('Config options are as expected', () => {
    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.clickAction).to.eql(ConfigActions.CURRENT_WINDOW)
    expect(result.condenseFileTree).to.eql(CONFIG_CONDENSE_FILETREE)
    expect(result.depth).to.eql(CONFIG_DEPTH)
    expect(result.searchMinimum).to.eql(CONFIG_SEARCH_MINIMUM)
    expect(result.showRootFolder).to.eql(CONFIG_SHOW_ROOT_FOLDER)
    expect(result.showTree).to.eql(CONFIG_SHOW_HIERARCHY)
  })

  test('Light/dark urls are as expected', () => {
    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.imgDarkFolderUri).to.eql(mockTemplateVars.imgDarkFolderUri)
    expect(result.imgLightFolderUri).to.eql(mockTemplateVars.imgLightFolderUri)
  })

  test('themeProcessorState is "idle" if no themeData', () => {
    const mockTemplateVars = getMockTemplateVars({ themeData: null })
    const result = getRenderVars(mockTemplateVars)

    expect(result.themeProcessorState).to.eql('idle')
  })

  test('themeProcessorState is themeData.state if themeData', () => {
    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.themeProcessorState).to.eql('ready')
  })

  test('fileIconsActive is "false" if config option deactivated', () => {
    showFileIconConfigStub.callsFake(() => false)

    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.fileIconsActive).to.be.false
  })

  test('fileIconsActive is "false" if the active theme is "none"', () => {
    showFileIconConfigStub.callsFake(() => true)
    getFileIconThemeConfigStub.callsFake(() => null)

    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.fileIconsActive).to.be.false
  })

  test('fileIconsActive is "true" if config option activated and there is an active theme', () => {
    showFileIconConfigStub.callsFake(() => true)
    getFileIconThemeConfigStub.callsFake(() => DEFAULT_THEME)

    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.fileIconsActive).to.be.true
  })

  test('fileIconKeys is empty if file icons are active and no theme data', () => {
    showFileiconsConfigConfigStub.callsFake(() => {
      return {}
    })
    showFileIconConfigStub.callsFake(() => true)
    getFileIconThemeConfigStub.callsFake(() => DEFAULT_THEME)

    const mockThemeData = getMockThemeData({ data: null })
    const mockTemplateVars = getMockTemplateVars({ themeData: mockThemeData })
    const result = getRenderVars(mockTemplateVars)

    expect(result.fileIconKeys).to.eql({})
  })

  test('fileIconKeys is as expected if file icons are active and there is theme and custom data', () => {
    showFileiconsConfigConfigStub.callsFake(() => {
      return {
        reacttypescript: ['tsx'],
      }
    })
    showFileIconConfigStub.callsFake(() => true)
    getFileIconThemeConfigStub.callsFake(() => DEFAULT_THEME)

    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars)

    expect(result.fileIconKeys).to.eql({
      custom: {
        reacttypescript: ['tsx'],
      },
      file: 'file',
      fileExtensions: ['ts'],
      folder: 'folder',
      folderExpanded: 'folder',
      languageIds: ['typescript'],
      rootFolder: 'folder',
      rootFolderExpanded: 'folder',
    })
  })
})
