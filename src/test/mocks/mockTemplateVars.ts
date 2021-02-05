import { Uri } from 'vscode';
import { mockRenderVars } from '.';
import { TemplateVars } from '../../webviews/webviews.interface';

const { imgDarkFolderUri, imgLightFolderUri } = mockRenderVars;

export const getMockTemplateVars = (
  templateVars: Partial<TemplateVars> = {},
  isEmpty: boolean = false
): TemplateVars => {
  return {
    cspSource: '34fdg5654dsf',
    cssFolderUri: isEmpty
      ? ({} as Uri)
      : ({
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/css',
        } as Uri),
    imgDarkFolderUri: isEmpty ? ({} as Uri) : imgDarkFolderUri,
    imgLightFolderUri: isEmpty ? ({} as Uri) : imgLightFolderUri,
    nonce: 'test-nonce',
    scriptFolderUri: isEmpty
      ? ({} as Uri)
      : ({
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/js',
        } as Uri),
    ...templateVars,
  };
};
