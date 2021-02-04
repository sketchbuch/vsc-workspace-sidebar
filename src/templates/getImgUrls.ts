import * as path from 'path';
import { RenderVars } from '../webviews/webviews.interface';

export const getImgUrls = (renderVars: RenderVars, iconName: string) => {
  const { imgDarkFolderUri, imgLightFolderUri } = renderVars;

  return {
    dark: `${imgDarkFolderUri}${path.sep}${iconName}.svg`,
    light: `${imgLightFolderUri}${path.sep}${iconName}.svg`,
  };
};
