import {
  getActionsConfig,
  getCondenseFileTreeConfig,
  getDepthConfig,
  getSearchMinConfig,
  getShowRootFolderConfig,
  getShowTreeConfig,
} from '../../config/getConfig'
import {
  FileIconKeys,
  FileIconKeysCustom,
  RenderVars,
  TemplateVars,
} from '../../webviews/webviews.interface'

// Example custom matchers - move to config
const iconMap: FileIconKeysCustom = {
  dart: ['flutter'],
  java: ['ea'],
  javascript: ['js', 'gnome'],
  js: ['gnome'],
  markdown: ['obsidian', 'review', 'sketchbuch'],
  md: ['obsidian', 'review', 'sketchbuch'],
  python: ['py'],
  react: ['rjs'],
  ts: ['deadfire', 'vsc', 'vscode', 'electron', 'todo'],
  typescript: ['deadfire', 'ts', 'vsc', 'vscode'],
  typescriptreact: ['electron', 'todo'],
  yaml: ['ansible'],
  yml: ['ansible'],
}

export const getRenderVars = ({
  imgDarkFolderUri,
  imgLightFolderUri,
  themeData,
}: TemplateVars): RenderVars => {
  const data = themeData?.data ?? null
  const fileIconKeys: FileIconKeys = {}

  if (data) {
    if (iconMap) {
      fileIconKeys.custom = iconMap
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
    imgDarkFolderUri,
    imgLightFolderUri,
    searchMinimum: getSearchMinConfig(),
    showRootFolder: getShowRootFolderConfig(),
    showTree: getShowTreeConfig(),
    themeProcessorState: themeData?.state ?? 'idle',
  }
}
