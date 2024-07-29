import { isWindows } from '../utils/os/isWindows'

export const FS_FOLDER_CSS = 'css'
export const FS_FOLDER_IMAGES = 'images'
export const FS_FOLDER_IMAGES_DARK = 'dark'
export const FS_FOLDER_IMAGES_LIGHT = 'light'
export const FS_FOLDER_JS = 'js'
export const FS_FOLDER_RESOURCES = 'resources'
export const FS_WS_FILETYPE = 'code-workspace'
export const FS_WS_EXT = `.${FS_WS_FILETYPE}`
export const FS_WEBVIEW_CODICONS_CSS = 'codicon.css'
export const FS_WEBVIEW_UI_TOOLKIT_JS = 'toolkit.js'
export const FS_WEBVIEW_WORKSPACE_CSS = 'webview-workspace.css'
export const FS_WEBVIEW_WORKSPACE_JS = 'webview-workspace.js'
export const FS_SLASH_REGEX = isWindows() ? /^\\/ : /^\//
