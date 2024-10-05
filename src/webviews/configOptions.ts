export type ConfigOption = {
  config: string
  type: ConfigOptionType
}

export type ConfigOptionType = 'search' | 'refetch' | 'rerender' | 'tree' | 'visible-files'

export type ConfigOptions = ConfigOption[]

export const WS_CONFIG = 'workspaceSidebar'
export const EXPLORER_CONFIG = 'explorer'
export const WORKBENCH_CONFIG = 'workbench'

export const explorerConfigOptions: ConfigOptions = [
  { config: `${EXPLORER_CONFIG}.compactFolders`, type: 'tree' },
]

export const workbenchConfigOptions: ConfigOptions = [
  { config: `${WORKBENCH_CONFIG}.tree.expandMode`, type: 'rerender' },
  { config: `${WORKBENCH_CONFIG}.tree.indent`, type: 'rerender' },
  { config: `${WORKBENCH_CONFIG}.tree.renderIndentGuides`, type: 'rerender' },
]

export const refetchConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.depth`, type: 'refetch' },
  { config: `${WS_CONFIG}.folder`, type: 'refetch' },
  { config: `${WS_CONFIG}.folders.excluded`, type: 'refetch' },
  { config: `${WS_CONFIG}.rootFolders`, type: 'refetch' },
  { config: `${WS_CONFIG}.excludeHiddenFolders`, type: 'refetch' },
]

export const rerenderConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.actions`, type: 'rerender' },
  { config: `${WS_CONFIG}.cleanLabels`, type: 'rerender' },
  { config: `${WS_CONFIG}.showFileIcons`, type: 'rerender' },
  { config: `${WS_CONFIG}.showFileIconsConfig`, type: 'rerender' },
]

export const searchConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.search.caseInsensitive`, type: 'search' },
  { config: `${WS_CONFIG}.search.matchStart`, type: 'search' },
]

export const treeConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.condenseFileTree`, type: 'tree' },
]

export const visibleFilesConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.showFolderHierarchy`, type: 'visible-files' },
  { config: `${WS_CONFIG}.showPaths`, type: 'visible-files' },
]

export const configOptions: ConfigOptions = [
  ...refetchConfigOptions,
  ...rerenderConfigOptions,
  ...searchConfigOptions,
  ...treeConfigOptions,
  ...visibleFilesConfigOptions,
]
