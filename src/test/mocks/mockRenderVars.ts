import { Uri } from 'vscode';
import { RenderVars } from '../../webviews/webviews.interface';

const baseUri = {
  scheme: 'file',
  authority: 'localhost',
};

export const mockRenderVars: RenderVars = {
  imgDarkFolderUri: { ...baseUri, path: '/resources/imgages/dark' } as Uri,
  imgLightFolderUri: { ...baseUri, path: '/resources/imgages/light' } as Uri,
};
