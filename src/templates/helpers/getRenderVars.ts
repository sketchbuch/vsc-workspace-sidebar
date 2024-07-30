import { getFileiconThemeConfig, getWorkbenchTreeConfig } from '../../config/core'
import {
  getActionsConfig,
  getCleanLabelsConfig,
  getShowFileiconConfig,
  getShowFileiconsConfigConfig,
} from '../../config/general'
import { getCondenseFileTreeConfig, getShowTreeConfig } from '../../config/treeview'
import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FileIconKeys, RenderVars, TemplateVars } from '../../webviews/webviews.interface'
import { isExternalWs } from './isExternalWs'

export const getRenderVars = (
  { imgDarkFolderUri, imgLightFolderUri, themeData }: TemplateVars,
  state: WorkspaceState
): RenderVars => {
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
    fileIconKeys,
    fileIconsActive,
    isExternalWs: isExternalWs(state),
    imgDarkFolderUri,
    imgLightFolderUri,
    showTree: getShowTreeConfig(),
    themeProcessorState: themeData?.state ?? 'idle',
    treeConfig: getWorkbenchTreeConfig(),
  }
}
