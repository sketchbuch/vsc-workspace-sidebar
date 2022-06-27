import {
  getActionsConfig,
  getCondenseFileTreeConfig,
  getSearchMinConfig,
  getShowRootFolderConfig,
  getShowTreeConfig,
} from '../../config/getConfig';
import { RenderVars, TemplateVars } from '../../webviews/webviews.interface';

export const getRenderVars = ({
  imgDarkFolderUri,
  imgLightFolderUri,
}: TemplateVars): RenderVars => {
  return {
    clickAction: getActionsConfig(),
    condenseFileTree: getCondenseFileTreeConfig(),
    imgDarkFolderUri,
    imgLightFolderUri,
    searchMinimum: getSearchMinConfig(),
    showRootFolder: getShowRootFolderConfig(),
    showTree: getShowTreeConfig(),
  };
};