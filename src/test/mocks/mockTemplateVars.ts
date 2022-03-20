import { Uri } from 'vscode';
import { getMockUri, mockRenderVars } from '.';
import { TemplateVars } from '../../webviews/webviews.interface';

const { imgDarkFolderUri, imgLightFolderUri } = mockRenderVars;

export const getMockTemplateVars = (
  templateVars: Partial<TemplateVars> = {},
  isEmpty: boolean = false
): TemplateVars => {
  return {
    cspSource: '34fdg5654dsf',
    codiconsFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/css/codicons',
        }),
    cssFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/css',
        }),
    imgDarkFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgDarkFolderUri }),
    imgLightFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgLightFolderUri }),
    nonce: 'test-nonce',
    scriptFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/js',
        }),
    title: 'Workspaces',
    uiFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/js/toolkit',
        }),
    ...templateVars,
  };
};
