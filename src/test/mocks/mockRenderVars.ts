import { Uri } from 'vscode'
import {
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
  ConfigActions,
} from '../../constants/config'
import { RenderVars } from '../../webviews/webviews.interface'

const baseUri = {
  scheme: 'file',
  authority: 'localhost',
}

export const getMockRenderVars = (renderVars: Partial<RenderVars> = {}): RenderVars => {
  return {
    clickAction: ConfigActions.CURRENT_WINDOW,
    condenseFileTree: CONFIG_CONDENSE_FILETREE,
    depth: CONFIG_DEPTH,
    imgDarkFolderUri: { ...baseUri, path: '/resources/imgages/dark' } as Uri,
    imgLightFolderUri: { ...baseUri, path: '/resources/imgages/light' } as Uri,
    searchMinimum: CONFIG_SEARCH_MINIMUM,
    showRootFolder: CONFIG_SHOW_ROOT_FOLDER,
    showTree: CONFIG_SHOW_HIERARCHY,
    ...renderVars,
  }
}
