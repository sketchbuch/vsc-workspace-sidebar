import { expect } from 'chai'
import path from 'path'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../config/core'
import * as generalConfigs from '../../../../config/general'
import * as treeConfigs from '../../../../config/treeview'
import {
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  CONFIG_SHOW_HIERARCHY,
  ConfigActions,
} from '../../../../constants/config'
import { EXT } from '../../../../constants/ext'
import { getRenderVars } from '../../../../templates/helpers/getRenderVars'
import { DEFAULT_THEME } from '../../../../theme/constants'
import { OS_HOMEFOLDER, file2 } from '../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../mocks/mockState'
import { getMockTemplateVars } from '../../../mocks/mockTemplateVars'
import { getMockThemeData } from '../../../mocks/mockThemeData'

suite('Templates > Helpers > getRenderVars():', () => {
  let actionsConfigStub: sinon.SinonStub
  let condenseFileTreeConfigStub: sinon.SinonStub
  let depthConfigStub: sinon.SinonStub
  let getFileIconThemeConfigStub: sinon.SinonStub
  let showFileIconConfigStub: sinon.SinonStub
  let showFileiconsConfigConfigStub: sinon.SinonStub
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
    showFileIconConfigStub = sinon
      .stub(generalConfigs, 'getShowFileiconConfig')
      .callsFake(() => CONFIG_SHOW_FILE_ICONS)
    showFileiconsConfigConfigStub = sinon
      .stub(generalConfigs, 'getShowFileiconsConfigConfig')
      .callsFake(() => CONFIG_SHOW_FILE_ICONS_CONFIG)
    showTreeConfigStub = sinon
      .stub(treeConfigs, 'getShowTreeConfig')
      .callsFake(() => CONFIG_SHOW_HIERARCHY)
  })

  teardown(() => {
    actionsConfigStub.restore()
    condenseFileTreeConfigStub.restore()
    depthConfigStub.restore()
    getFileIconThemeConfigStub.restore()
    showFileIconConfigStub.restore()
    showFileiconsConfigConfigStub.restore()
    showTreeConfigStub.restore()
  })

  const mockState = getMockState()
  const mockTemplateVars = getMockTemplateVars()

  test('Config options are as expected', () => {
    const mockTemplateVars = getMockTemplateVars()
    const result = getRenderVars(mockTemplateVars, mockState)

    expect(result.clickAction).to.eql(ConfigActions.CURRENT_WINDOW)
    expect(result.condenseFileTree).to.eql(CONFIG_CONDENSE_FILETREE)
    expect(result.showTree).to.eql(CONFIG_SHOW_HIERARCHY)
  })

  test('Light/dark urls are as expected', () => {
    const result = getRenderVars(mockTemplateVars, mockState)

    expect(result.imgDarkFolderUri).to.eql(mockTemplateVars.imgDarkFolderUri)
    expect(result.imgLightFolderUri).to.eql(mockTemplateVars.imgLightFolderUri)
  })

  suite('File Themes:', () => {
    test('themeProcessorState is "idle" if no themeData', () => {
      const mockTemplateVars = getMockTemplateVars({ themeData: null })
      const result = getRenderVars(mockTemplateVars, mockState)

      expect(result.themeProcessorState).to.eql('idle')
    })

    test('themeProcessorState is themeData.state if themeData', () => {
      const result = getRenderVars(mockTemplateVars, mockState)

      expect(result.themeProcessorState).to.eql('ready')
    })

    test('fileIconsActive is "false" if config option deactivated', () => {
      showFileIconConfigStub.callsFake(() => false)

      const result = getRenderVars(mockTemplateVars, mockState)

      expect(result.fileIconsActive).to.be.false
    })

    test('fileIconsActive is "false" if the active theme is "none"', () => {
      showFileIconConfigStub.callsFake(() => true)
      getFileIconThemeConfigStub.callsFake(() => null)

      const result = getRenderVars(mockTemplateVars, mockState)

      expect(result.fileIconsActive).to.be.false
    })

    test('fileIconsActive is "true" if config option activated and there is an active theme', () => {
      showFileIconConfigStub.callsFake(() => true)
      getFileIconThemeConfigStub.callsFake(() => DEFAULT_THEME)

      const result = getRenderVars(mockTemplateVars, mockState)

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
      const result = getRenderVars(mockTemplateVars, mockState)

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

      const result = getRenderVars(mockTemplateVars, mockState)

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

  suite('isExternalWs:', () => {
    const mockRootFolders = getMockRootFolders()

    test('Is false if wsType is folder', () => {
      const { isExternalWs } = getRenderVars(mockTemplateVars, getMockState({ wsType: 'folder' }))
      expect(isExternalWs).to.be.false
    })

    test('Is false if wsType is none', () => {
      const { isExternalWs } = getRenderVars(mockTemplateVars, getMockState({ wsType: 'none' }))
      expect(isExternalWs).to.be.false
    })

    test('Is false if wsType is ws and a match is found for selected', () => {
      const { isExternalWs } = getRenderVars(
        mockTemplateVars,
        getMockState({ ...mockRootFolders, selected: file2.file, wsType: 'ws' })
      )
      expect(isExternalWs).to.be.false
    })

    test('Is true if wsType is ws and no match is found for selected', () => {
      const { isExternalWs } = getRenderVars(
        mockTemplateVars,
        getMockState({
          ...mockRootFolders,
          selected: path.join(OS_HOMEFOLDER, 'Videos', `Video1.${EXT}`),
          wsType: 'ws',
        })
      )
      expect(isExternalWs).to.be.true
    })
  })
})
