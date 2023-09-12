import {
  getActionsConfig,
  getCondenseFileTreeConfig,
  getDepthConfig,
  getSearchMinConfig,
  getShowRootFolderConfig,
  getShowTreeConfig,
} from '../../config/getConfig'
import { RenderVars, TemplateVars } from '../../webviews/webviews.interface'

export const getRenderVars = ({
  imgDarkFolderUri,
  imgLightFolderUri,
  themeData,
}: TemplateVars): RenderVars => {
  let fileIconKeys: string[] = []

  if (themeData) {
    if (themeData.fileExtensions) {
      fileIconKeys = fileIconKeys.concat(
        Object.keys(themeData.fileExtensions).filter((key) => !key.includes('.'))
      )
    }

    if (themeData.languageIds) {
      fileIconKeys = fileIconKeys.concat(
        Object.keys(themeData.languageIds).filter((key) => !key.includes('.'))
      )
    }

    fileIconKeys.sort()
  }

  return {
    clickAction: getActionsConfig(),
    condenseFileTree: getCondenseFileTreeConfig(),
    depth: getDepthConfig(),
    fileIconKeys,
    imgDarkFolderUri,
    imgLightFolderUri,
    searchMinimum: getSearchMinConfig(),
    showRootFolder: getShowRootFolderConfig(),
    showTree: getShowTreeConfig(),
  }
}
