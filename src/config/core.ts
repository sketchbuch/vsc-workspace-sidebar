import { workspace } from 'vscode'
import { ThemeId } from 'vscode-file-theme-processor'
import {
  CONFIG_EXPLORER_COMPACT_FOLDERS,
  CONFIG_WORKBENCH_TREE_EXPAND_MODE,
  CONFIG_WORKBENCH_TREE_INDENT,
  CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES,
} from '../constants/config'

export type ExpandModes = 'doubleClick' | 'singleClick'
export type RenderIndentGuides = 'always' | 'none' | 'onHover'

export type WorkbenchConfig = {
  expandMode: ExpandModes
  indent: number
  renderIndentGuides: RenderIndentGuides
}

export const getExplorerCompactFoldersConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('explorer.compactFolders') ??
    CONFIG_EXPLORER_COMPACT_FOLDERS
  )
}

export const getWorkbenchTreeConfig = (): WorkbenchConfig => {
  const expandMode =
    workspace.getConfiguration().get<ExpandModes>('workbench.tree.expandMode') ??
    CONFIG_WORKBENCH_TREE_EXPAND_MODE
  const indent =
    workspace.getConfiguration().get<number>('workbench.tree.indent') ??
    CONFIG_WORKBENCH_TREE_INDENT
  const renderIndentGuides =
    workspace.getConfiguration().get<RenderIndentGuides>('workbench.tree.renderIndentGuides') ??
    CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES

  return {
    expandMode,
    indent,
    renderIndentGuides,
  }
}

export const getFileiconThemeConfig = (): ThemeId => {
  return workspace.getConfiguration('workbench').iconTheme
}
