import * as path from 'path'
import { Uri } from 'vscode'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
  ConfigActions,
} from '../../constants/config'
import { RenderVars } from '../../webviews/webviews.interface'

const baseUri = {
  scheme: 'file',
  authority: 'localhost',
}

export const getMockRenderVars = (renderVars: Partial<RenderVars> = {}): RenderVars => {
  return {
    cleanLabels: CONFIG_CLEAN_LABELS,
    clickAction: ConfigActions.CURRENT_WINDOW,
    condenseFileTree: CONFIG_CONDENSE_FILETREE,
    depth: CONFIG_DEPTH,
    fileIconKeys: {},
    fileIconsActive: false,
    imgDarkFolderUri: { ...baseUri, path: path.join('/resources', 'images', 'dark') } as Uri,
    imgLightFolderUri: { ...baseUri, path: path.join('/resources', 'images', 'light') } as Uri,
    isExternalWs: false,
    searchMinimum: CONFIG_SEARCH_MINIMUM,
    showTree: CONFIG_SHOW_HIERARCHY,
    themeProcessorState: 'ready',
    ...renderVars,
  }
}
