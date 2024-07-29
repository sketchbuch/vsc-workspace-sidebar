export interface ConfigOption {
  config: string
  type: 'search' | 'refresh' | 'rerender' | 'tree' | 'visible-files'
}

export type ConfigOptions = ConfigOption[]

export const WS_CONFIG = 'workspaceSidebar'
export const EXPLORER_CONFIG = 'explorer'

export const refreshConfigOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.depth`, type: 'refresh' },
  { config: `${WS_CONFIG}.folder`, type: 'refresh' },
  { config: `${WS_CONFIG}.folders.excluded`, type: 'refresh' },
  { config: `${WS_CONFIG}.rootFolders`, type: 'refresh' },
  { config: `${WS_CONFIG}.excludeHiddenFolders`, type: 'refresh' },
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
  ...refreshConfigOptions,
  ...rerenderConfigOptions,
  ...searchConfigOptions,
  ...treeConfigOptions,
  ...visibleFilesConfigOptions,
]
