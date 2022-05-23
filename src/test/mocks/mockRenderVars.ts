import { Uri } from 'vscode';
import {
  ConfigActions,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
} from '../../constants/config';
import { RenderVars } from '../../webviews/webviews.interface';

const baseUri = {
  scheme: 'file',
  authority: 'localhost',
};

export const getMockRenderVars = (renderVars: Partial<RenderVars> = {}): RenderVars => {
  return {
    clickAction: ConfigActions.CURRENT_WINDOW,
    condenseFileTree: CONFIG_CONDENSE_FILETREE,
    imgDarkFolderUri: { ...baseUri, path: '/resources/imgages/dark' } as Uri,
    imgLightFolderUri: { ...baseUri, path: '/resources/imgages/light' } as Uri,
    searchMinimum: CONFIG_SEARCH_MINIMUM,
    showRootFolder: CONFIG_SHOW_ROOT_FOLDER,
    showTree: CONFIG_SHOW_HIERARCHY,
    ...renderVars,
  };
};
