import * as path from 'path'
import { Uri } from 'vscode'
import { TemplateVars } from '../../webviews/webviews.interface'
import { getMockUri } from './mockExtensionUri'
import { getMockRenderVars } from './mockRenderVars'
import { getMockThemeData } from './mockThemeData'

const { imgDarkFolderUri, imgLightFolderUri } = getMockRenderVars()

export const getMockTemplateVars = (
  templateVars: Partial<TemplateVars> = {},
  isEmpty: boolean = false
): TemplateVars => {
  return {
    cssData: null,
    cspSource: '34fdg5654dsf',
    codiconsFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: path.join('resources', 'css', 'codicons'),
        }),
    cssFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: path.join('resources', 'css'),
        }),
    imgDarkFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgDarkFolderUri }),
    imgLightFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgLightFolderUri }),
    nonce: 'test-nonce',
    scriptFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: path.join('resources', 'js'),
        }),
    themeData: getMockThemeData(),
    title: 'Workspaces',
    uiFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
          scheme: 'file',
          authority: 'localhost',
          path: path.join('resources', 'js', 'toolkit'),
        }),
    ...templateVars,
  }
}
