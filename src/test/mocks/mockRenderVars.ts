import * as path from 'path'
import { Uri } from 'vscode'
import { WorkbenchConfig } from '../../config/core'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_WORKBENCH_TREE_EXPAND_MODE,
  CONFIG_WORKBENCH_TREE_INDENT,
  CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES,
  ConfigActions,
} from '../../constants/config'
import { RenderVars } from '../../webviews/webviews.interface'

const baseUri = {
  scheme: 'file',
  authority: 'localhost',
}

export const getMockTreeConfig = (treeConfig: Partial<WorkbenchConfig> = {}): WorkbenchConfig => {
  return {
    expandMode: CONFIG_WORKBENCH_TREE_EXPAND_MODE,
    indent: CONFIG_WORKBENCH_TREE_INDENT,
    renderIndentGuides: CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES,
    ...treeConfig,
  }
}

export const getMockRenderVars = (renderVars: Partial<RenderVars> = {}): RenderVars => {
  return {
    cleanLabels: CONFIG_CLEAN_LABELS,
    clickAction: ConfigActions.CURRENT_WINDOW,
    condenseFileTree: CONFIG_CONDENSE_FILETREE,
    fileIconKeys: {},
    fileIconsActive: false,
    imgDarkFolderUri: { ...baseUri, path: path.join('/resources', 'images', 'dark') } as Uri,
    imgLightFolderUri: { ...baseUri, path: path.join('/resources', 'images', 'light') } as Uri,
    isExternalWs: false,
    showTree: CONFIG_SHOW_HIERARCHY,
    themeProcessorState: 'ready',
    treeConfig: {
      ...getMockTreeConfig(),
    },
    ...renderVars,
  }
}
