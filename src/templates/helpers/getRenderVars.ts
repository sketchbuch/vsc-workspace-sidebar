import { getFileiconThemeConfig } from '../../config/core'
import {
  getActionsConfig,
  getCleanLabelsConfig,
  getDepthConfig,
  getShowFileiconConfig,
  getShowFileiconsConfigConfig,
} from '../../config/general'
import { getSearchMinConfig } from '../../config/search'
import {
  getCondenseFileTreeConfig,
  getShowRootFolderConfig,
  getShowTreeConfig,
} from '../../config/treeview'
import { FileIconKeys, RenderVars, TemplateVars } from '../../webviews/webviews.interface'

export const getRenderVars = ({
  imgDarkFolderUri,
  imgLightFolderUri,
  themeData,
}: TemplateVars): RenderVars => {
  const cleanLabels = getCleanLabelsConfig()
  const showFileiconConfig = getShowFileiconConfig()
  const curFileIconTheme = getFileiconThemeConfig()
  const fileIconsActive = showFileiconConfig && !!curFileIconTheme

  const data = themeData?.data ?? null
  const fileIconKeys: FileIconKeys = {}

  if (fileIconsActive && data) {
    const showFileiconsConfigConfig = getShowFileiconsConfigConfig()

    if (showFileiconsConfigConfig) {
      fileIconKeys.custom = showFileiconsConfigConfig
    }

    if (data.fileExtensions) {
      fileIconKeys.fileExtensions = Object.keys(data.fileExtensions).map((key) => key)
    }

    if (data.languageIds) {
      fileIconKeys.languageIds = Object.keys(data.languageIds).map((key) => key)
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
    cleanLabels,
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
