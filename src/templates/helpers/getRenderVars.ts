import {
  getActionsConfig,
  getCondenseFileTreeConfig,
  getDepthConfig,
  getFileiconThemeConfig,
  getSearchMinConfig,
  getShowFileiconConfig,
  getShowFileiconsConfigConfig,
  getShowRootFolderConfig,
  getShowTreeConfig,
} from '../../config/getConfig'
import { FileIconKeys, RenderVars, TemplateVars } from '../../webviews/webviews.interface'

export const getRenderVars = ({
  imgDarkFolderUri,
  imgLightFolderUri,
  themeData,
}: TemplateVars): RenderVars => {
  const showFileiconConfig = getShowFileiconConfig()
  const showFileiconsConfigConfig = getShowFileiconsConfigConfig()
  const curFileIconTheme = getFileiconThemeConfig()
  const fileIconsActive = showFileiconConfig && !!curFileIconTheme

  const data = themeData?.data ?? null
  const fileIconKeys: FileIconKeys = {}

  if (fileIconsActive && data) {
    if (showFileiconsConfigConfig) {
      fileIconKeys.custom = showFileiconsConfigConfig
    }

    if (data.fileExtensions) {
      fileIconKeys.fileExtensions = Object.keys(data.fileExtensions).map((key) => key)
      fileIconKeys.fileExtensions.sort()
    }

    if (data.languageIds) {
      fileIconKeys.languageIds = Object.keys(data.languageIds).map((key) => key)
      fileIconKeys.languageIds.sort()
    }

    if (data.file) {
      fileIconKeys.file = data.file
    }

    if (data.folder) {
      fileIconKeys.folder = data.folder
    }

    if (data.folderExpanded) {
      fileIconKeys.folderExpanded = data.folderExpanded
    }

    if (data.rootFolder) {
      fileIconKeys.rootFolder = data.rootFolder
    }

    if (data.rootFolderExpanded) {
      fileIconKeys.rootFolderExpanded = data.rootFolderExpanded
    }
  }

  return {
    clickAction: getActionsConfig(),
    condenseFileTree: getCondenseFileTreeConfig(),
    depth: getDepthConfig(),
    fileIconKeys,
    fileIconsActive,
    imgDarkFolderUri,
    imgLightFolderUri,
    searchMinimum: getSearchMinConfig(),
    showRootFolder: getShowRootFolderConfig(),
    showTree: getShowTreeConfig(),
    themeProcessorState: themeData?.state ?? 'idle',
  }
}
