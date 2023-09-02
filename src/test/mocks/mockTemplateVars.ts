import { Uri } from 'vscode'
import { TemplateVars } from '../../webviews/webviews.interface'
import { getMockUri } from './mockExtensionUri'
import { getMockRenderVars } from './mockRenderVars'
import { mockThemeData } from './mockThemeData'

const { imgDarkFolderUri, imgLightFolderUri } = getMockRenderVars()

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
    themeData: mockThemeData,
    title: 'Workspaces',
    uiFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: '/resources/js/toolkit',
        }),
    ...templateVars,
  }
}
