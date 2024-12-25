import crypto from 'crypto'
import * as vscode from 'vscode'
import { t } from 'vscode-ext-localisation'
import {
  CssData,
  CssGenerator,
  FileThemeProcessor,
  FileThemeProcessorObserver,
  FileThemeProcessorState,
} from 'vscode-file-theme-processor'
import { getFoldersConfig } from '../../config/folders'
import { getActionsConfig, getFocusExplorerConfig } from '../../config/general'
import { getSearchCaseInsensitiveConfig, getSearchMatchStartConfig } from '../../config/search'
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_VSC_FOCUS_FILEVIEW,
  CMD_VSC_OPEN_SETTINGS,
  CMD_VSC_SAVE_WS_AS,
  CMD_VSC_SET_CTX,
} from '../../constants/commands'
import { ConfigActions } from '../../constants/config'
import { EXT_LOADED, EXT_WEBVIEW_WS, EXT_WSSTATE_CACHE } from '../../constants/ext'
import { store } from '../../store/redux'
import { getHtml } from '../../templates/getHtml'
import { defaultTemplate } from '../../templates/workspace/templates/defaultTemplate'
import { HtmlData, PostMessage } from '../webviews.interface'
import {
  PostMsgActionsBackend as Actions,
  PostMsgActionsFrontend as ClientActions,
  FolderState,
  Payload,
  WorkspaceCacheRootFolders,
  WorkspaceRootFolderCache,
  WorkspaceRootFolderMachineCache,
  WorkspaceState,
} from './WorkspaceViewProvider.interface'
import { getFolderCounts } from './helpers/getFolderCounts'
import { getNewRootFolderConfig } from './helpers/getNewRootFolderConfig'
import { updateRootFolders } from './helpers/updateRootFolders'
import { fetch } from './store/fetch'
import { workspaceSlice } from './store/workspaceSlice'

const { executeCommand } = vscode.commands
const {
  list,
  setFileTree,
  setRootFolders,
  setSearch,
  setVisibleFiles,
  toggleFolderState,
  toggleFolderStateBulk,
} = workspaceSlice.actions

export class WorkspaceViewProvider
  implements vscode.WebviewViewProvider, FileThemeProcessorObserver
{
  public static readonly viewType = EXT_WEBVIEW_WS
  private _view?: vscode.WebviewView
  private _cssGenerator: CssGenerator
  private readonly _version: string = '2.1.1'

  constructor(
    private readonly _ctx: vscode.ExtensionContext,
    private readonly _fileThemeProcessor: FileThemeProcessor
  ) {
    this._cssGenerator = new CssGenerator()
    this._fileThemeProcessor.subscribe(this)
  }

  private getCacheId() {
    return crypto
      .createHash('sha256')
      .update(`${vscode.env.appRoot}-${vscode.env.remoteName}`)
      .digest('hex')
  }

  private async deleteCache(refetchAll = false) {
    let newCacheData: WorkspaceRootFolderCache | undefined
    const cachedData = this._ctx.globalState.get<WorkspaceRootFolderCache>(EXT_WSSTATE_CACHE)

    if (cachedData) {
      const { caches } = cachedData

      if (caches && caches.length > 0) {
        const cacheId = this.getCacheId()
        const cacheIndex = caches.findIndex((cache) => cache.cacheId === cacheId)

        if (cacheIndex > -1) {
          newCacheData = {
            caches: [...caches.slice(0, cacheIndex), ...caches.slice(cacheIndex + 1)],
          }
        }
      }
    }

    await vscode.commands.executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, false)
    await this._ctx.globalState.update(EXT_WSSTATE_CACHE, newCacheData)

    const configFolders = getFoldersConfig()
    const state = store.getState().ws
    const newRootFolderData = updateRootFolders({ configFolders, rootFolders: state.rootFolders })
    const reorderedRootFolders = newRootFolderData.map((folder) => folder.rootFolder)

    this.updateCache({ ...state, rootFolders: reorderedRootFolders })
    store.dispatch(setRootFolders(reorderedRootFolders))

    newRootFolderData.forEach((folder) => {
      if (refetchAll || folder.status !== 'same') {
        store.dispatch(fetch(folder.configFolder)).then(() => {
          this.updateCache(store.getState().ws)
        })
      }
    })
  }

  private getCache() {
    const cachedData = this._ctx.globalState.get<WorkspaceRootFolderCache>(EXT_WSSTATE_CACHE)

    if (cachedData) {
      const { caches } = cachedData

      if (caches) {
        const cacheId = this.getCacheId()

        for (let cacheIndex = 0; cacheIndex < caches.length; cacheIndex++) {
          const cache = caches[cacheIndex]

          if (cache.cacheId === cacheId && cache.version === this._version) {
            return cache.rootFolders
          }
        }
      }
    }

    return null
  }

  private async setCache(data: WorkspaceRootFolderMachineCache) {
    const cachedData = this._ctx.globalState.get<WorkspaceRootFolderCache>(EXT_WSSTATE_CACHE)

    if (cachedData) {
      const { caches } = cachedData

      if (caches && caches.length > 0) {
        const { cacheId } = data
        const cacheIndex = caches.findIndex((cache) => cache.cacheId === cacheId)

        if (cacheIndex > -1) {
          // Update existing data already in cache
          return this._ctx.globalState.update(EXT_WSSTATE_CACHE, {
            caches: [...caches.slice(0, cacheIndex), { ...data }, ...caches.slice(cacheIndex + 1)],
          })
        } else {
          // Append data to cache
          return this._ctx.globalState.update(EXT_WSSTATE_CACHE, {
            caches: [...caches, { ...data }],
          })
        }
      }
    }

    // Create completely new cache
    return this._ctx.globalState.update(EXT_WSSTATE_CACHE, { caches: [{ ...data }] })
  }

  private getViewTitle({ search, rootFolders, view }: WorkspaceState) {
    let viewTitle = t('views.title')

    if (view === 'list') {
      const { fileCount, visibleFileCount } = getFolderCounts(rootFolders, ['loading'])

      if (fileCount > 0) {
        const titleKey = search.term
          ? 'workspace.list.titleCount.searched'
          : 'workspace.list.titleCount.default'
        const placeholders = {
          matches: visibleFileCount.toString(),
          total: fileCount.toString(),
        }

        viewTitle = t(titleKey, placeholders)
      }
    }

    return viewTitle
  }

  private render() {
    if (this._view !== undefined) {
      const state = store.getState().ws
      const themeData = state.view === 'list' ? this._fileThemeProcessor.getThemeData() : null
      let cssData: CssData | null = null

      if (themeData !== null) {
        this.setOptions(this._view, themeData.localResourceRoots)

        if (themeData.data && themeData.themeId) {
          cssData = this._cssGenerator.getCss(themeData.data, themeData.themeId, this._view.webview)
        }
      }

      this._view.title = this.getViewTitle(state)

      const htmlData: HtmlData<WorkspaceState> = {
        state: { ...state },
        title: this._view.title,
        webview: this._view.webview,
      }

      this._view.webview.html = getHtml<WorkspaceState>(
        {
          cssData,
          extensionPath: this._ctx.extensionUri,
          htmlData,
          template: defaultTemplate,
          themeData,
        },
        crypto.createHash('sha256').update(crypto.randomBytes(16)).digest('hex')
      )

      // Suppress error when running tests
    } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Test) {
      vscode.window.showErrorMessage(t('errors.viewNotFound'))
    }
  }

  private setOptions = (webviewView: vscode.WebviewView, localResourceRoots: string[] = []) => {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._ctx.extensionUri,
        ...localResourceRoots.map((resouceRoot) => {
          return vscode.Uri.file(resouceRoot)
        }),
      ],
    }
  }

  private setupWebview(webviewView: vscode.WebviewView) {
    this.setOptions(webviewView)

    webviewView.webview.onDidReceiveMessage(async (message: PostMessage<Payload, Actions>) => {
      const { action, payload } = message

      switch (action) {
        case Actions.FOLDER_CLICK:
          if (payload !== undefined) {
            store.dispatch(toggleFolderState(JSON.parse(payload)))
          }
          break

        case Actions.ICON_CLICK:
        case Actions.MAIN_CLICK:
          if (payload) {
            const clickAction = getActionsConfig()
            let cmd = clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_NEW_WIN : CMD_OPEN_CUR_WIN

            if (action === Actions.ICON_CLICK) {
              cmd = clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_CUR_WIN : CMD_OPEN_NEW_WIN
            }

            await executeCommand(cmd, payload, true)

            if (cmd === CMD_OPEN_NEW_WIN && getFocusExplorerConfig()) {
              await executeCommand(CMD_VSC_FOCUS_FILEVIEW)
            }
          }
          break

        case Actions.ICON_CLICK_FILEMANAGER:
          if (payload) {
            await executeCommand('revealFileInOS', vscode.Uri.file(payload))
          }
          break

        case Actions.ICON_CLICK_REFETCH:
          if (payload) {
            const configFolders = getFoldersConfig()
            const folder = configFolders.find((folder) => folder.path === payload)

            if (folder) {
              store.dispatch(fetch(folder)).then(() => {
                this.updateCache(store.getState().ws)
              })
            } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
              vscode.window.showErrorMessage(
                `Unable to refetch rootfolder workspace. No match found for "${payload}"`
              )
            }
          }
          break

        case Actions.ADD_TO_ROOTS:
          if (vscode.workspace.workspaceFile) {
            const newRootFolderConfig = getNewRootFolderConfig(vscode.workspace.workspaceFile)

            await vscode.workspace
              .getConfiguration()
              .update('workspaceSidebar.rootFolders', newRootFolderConfig, true)
          } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
            vscode.window.showErrorMessage('vscode.workspace.workspaceFile is undefined')
          }

          break

        case Actions.SAVE_WS:
          if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            await executeCommand(CMD_VSC_SAVE_WS_AS)
            this.render()
          } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
            vscode.window.showErrorMessage(
              'vscode.workspace.workspaceFolders are undefined or zero length'
            )
          }

          break

        case Actions.SEARCH:
          if (payload !== undefined) {
            store.dispatch(setSearch({ term: payload }))
          }
          break

        case Actions.SEARCH_CHECKBOX_DISABLE:
        case Actions.SEARCH_CHECKBOX_ENABLE:
          if (payload !== undefined) {
            const setting = `workspaceSidebar.search.${payload}`
            const newSettingValue = action === Actions.SEARCH_CHECKBOX_ENABLE

            await vscode.workspace.getConfiguration().update(setting, newSettingValue, true)
          }
          break

        case Actions.VIEW_LINK:
          if (payload === 'ROOT_FOLDERS') {
            await executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar.rootFolders')
          } else if (payload === 'DEPTH') {
            await executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar.depth')
          } else if (payload === 'EXCLUDE_FOLDERS') {
            await executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar.folders.excluded')
          } else if (payload === 'EXCLUDE_HIDDEN_FOLDERS') {
            await executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar.excludeHiddenFolders')
          } else {
            await executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar')
          }

          break

        case Actions.ERROR_MSG:
          if (
            this._ctx.extensionMode !== vscode.ExtensionMode.Production &&
            payload !== undefined
          ) {
            vscode.window.showErrorMessage(payload)
          }
          break

        default:
          if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
            vscode.window.showErrorMessage(`Action not found: "${action}"`)
          }
          break
      }
    })
  }

  private async stateChanged(newState: WorkspaceState) {
    const { view } = newState

    switch (view) {
      case 'error':
      case 'invalid':
      case 'list':
        await executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, true)
        break

      default:
        break
    }
  }

  private async updateCache(newState: WorkspaceState) {
    const { rootFolders, view } = newState

    switch (view) {
      case 'list':
        const { fileCount } = getFolderCounts(rootFolders)

        if (fileCount) {
          const reducedRootFolders = rootFolders.reduce<WorkspaceCacheRootFolders>(
            (allRoots, curRoot) => {
              return [
                ...allRoots,
                {
                  configId: curRoot.configId,
                  depth: curRoot.depth,
                  folderPath: curRoot.folderPath,
                  files: curRoot.files,
                },
              ]
            },
            []
          )

          const cacheId = this.getCacheId()

          await this.setCache({
            appRoot: vscode.env.appRoot,
            cacheId,
            remoteName: vscode.env.remoteName ?? 'undefined',
            rootFolders: reducedRootFolders,
            version: this._version,
          })
        }

        break

      default:
        break
    }
  }

  public focusInput() {
    if (this._view?.visible) {
      this._view.webview.postMessage({ action: ClientActions.FOCUS_SEARCH })
    }
  }

  public notify(state: FileThemeProcessorState) {
    if (this._view !== undefined) {
      this.render()
    }
  }

  public refetch() {
    this.deleteCache()
  }

  public refetchAll() {
    this.deleteCache(true)
  }

  public rerender() {
    this.render()
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView

    store.subscribe(() => {
      this.render()
      this.stateChanged(store.getState().ws)
    })

    this.setupWebview(webviewView)
    this.updateSearch()

    const cachedFiles = this.getCache()

    if (cachedFiles) {
      store.dispatch(list(cachedFiles))
    } else {
      const configFolders = getFoldersConfig()

      configFolders.forEach((folder) => {
        store.dispatch(fetch(folder)).then(() => {
          this.updateCache(store.getState().ws)
        })
      })
    }
  }

  public toggleAllFolders(type: FolderState) {
    store.dispatch(toggleFolderStateBulk(type))
  }

  public updateFileTree() {
    store.dispatch(setFileTree())
  }

  public updateSearch() {
    store.dispatch(
      setSearch({
        caseInsensitive: getSearchCaseInsensitiveConfig(),
        matchStart: getSearchMatchStartConfig(),
      })
    )
  }

  public updateVisibleFiles() {
    store.dispatch(setVisibleFiles())
  }
}
