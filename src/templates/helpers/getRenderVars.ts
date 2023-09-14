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
  const data = themeData?.data ?? null
  let fileIconKeys: string[] = []

  if (data) {
    if (data.fileExtensions) {
      fileIconKeys = fileIconKeys.concat(
        Object.keys(data.fileExtensions).filter((key) => !key.includes('.'))
      )
    }

    if (data.languageIds) {
      fileIconKeys = fileIconKeys.concat(
        Object.keys(data.languageIds).filter((key) => !key.includes('.'))
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
    themeProcessorState: themeData?.state ?? 'idle',
  }
}
