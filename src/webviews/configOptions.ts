interface ConfigOption {
  config: string
  type: 'refresh' | 'rerender' | 'tree' | 'visible-files'
}

export type ConfigOptions = ConfigOption[]

export const WS_CONFIG = 'workspaceSidebar'
export const EXPLORER_CONFIG = 'explorer'
export const configOptions: ConfigOptions = [
  { config: `${WS_CONFIG}.actions`, type: 'rerender' },
  { config: `${WS_CONFIG}.cleanLabels`, type: 'refresh' },
  { config: `${WS_CONFIG}.condenseFileTree`, type: 'tree' },
  { config: `${WS_CONFIG}.depth`, type: 'refresh' },
  { config: `${WS_CONFIG}.folder`, type: 'refresh' },
  { config: `${WS_CONFIG}.searchMinimum`, type: 'rerender' },
  { config: `${WS_CONFIG}.showFileIcons`, type: 'rerender' },
  { config: `${WS_CONFIG}.showFileIconsConfig`, type: 'rerender' },
  { config: `${WS_CONFIG}.showFolderHierarchy`, type: 'visible-files' },
  { config: `${WS_CONFIG}.showPaths`, type: 'visible-files' },
  { config: `${WS_CONFIG}.showRootFolder`, type: 'tree' },
  { config: `${EXPLORER_CONFIG}.compactFolders`, type: 'tree' },
]
