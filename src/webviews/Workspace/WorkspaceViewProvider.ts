import crypto from 'crypto'
import * as vscode from 'vscode'
import { t } from 'vscode-ext-localisation'
import {
  CssData,
  CssGenerator,
  FileThemeProcessor,
  FileThemeProcessorObserver,
} from 'vscode-file-theme-processor'
import { SortIds } from '../../commands/registerCommands'
import { getActionsConfig } from '../../config/general'
import { getSearchCaseInsensitiveConfig, getSearchMatchStartConfig } from '../../config/search'
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_VSC_OPEN_SETTINGS,
  CMD_VSC_SAVE_WS_AS,
  CMD_VSC_SET_CTX,
} from '../../constants/commands'
import { ConfigActions } from '../../constants/config'
import { EXT_LOADED, EXT_SORT, EXT_WEBVIEW_WS, EXT_WSSTATE_CACHE } from '../../constants/ext'
import { store } from '../../store/redux'
import { getHtml } from '../../templates/getHtml'
import { defaultTemplate } from '../../templates/workspace/templates/defaultTemplate'
import { HtmlData, PostMessage } from '../webviews.interface'
import {
  WorkspacePmActions as Actions,
  WorkspacePmClientActions as ClientActions,
  FolderState,
  WorkspacePmPayload as Payload,
  WorkspaceCache,
  WorkspaceState,
} from './WorkspaceViewProvider.interface'
import { fetchNew } from './store/fetchNew'
import { workspaceSlice } from './store/workspaceSlice'

const { executeCommand } = vscode.commands
const {
  setFileTree,
  setSort,
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

  constructor(
    private readonly _ctx: vscode.ExtensionContext,
    private readonly _fileThemeProcessor: FileThemeProcessor
  ) {
    this._cssGenerator = new CssGenerator()
    this._fileThemeProcessor.subscribe(this)
  }

  private getCacheFiles() {
    const cachedData = this._ctx.globalState.get<WorkspaceCache>(EXT_WSSTATE_CACHE)

    if (cachedData) {
      const { files, timestamp } = cachedData

      if (files && timestamp) {
        return [...files]
      }
    }

    return null
  }

  private getViewTitle({ search, state: view }: WorkspaceState) {
    let viewTitle = t('views.title')

    /*     if (view === 'list' && files !== null) {
      viewTitle = t(
        search ? 'workspace.list.titleCount.searched' : 'workspace.list.titleCount.default',
        {
          matches: visibleFiles.length.toString(),
          total: files.length.toString(),
        }
      )
    } */

    return viewTitle
  }

  private render() {
    if (this._view !== undefined) {
      const state = store.getState().ws

      const themeData = state.state === 'list' ? this._fileThemeProcessor.getThemeData() : null
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
        crypto.randomBytes(16).toString('hex')
      )

      // Suppress error when running in extension development host
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
          return vscode.Uri.parse(resouceRoot)
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
            store.dispatch(toggleFolderState(payload))
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

            executeCommand(cmd, payload, true)
          }
          break

        case Actions.ICON_CLICK_FILEMANAGER:
          if (payload) {
            executeCommand('revealFileInOS', vscode.Uri.file(payload))
          }
          break

        case Actions.SAVE_WS:
          executeCommand(CMD_VSC_SAVE_WS_AS)
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

            vscode.workspace.getConfiguration().update(setting, newSettingValue, true)
          }
          break

        case Actions.SHOW_SETTINGS:
          executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar')
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

  private stateChanged(newState: WorkspaceState) {
    const { state } = newState

    switch (state) {
      case 'error':
      case 'invalid':
        executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, true)
        break

      case 'list':
        executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, true)

        /* if (files) {
          this._ctx.globalState.update(EXT_WSSTATE_CACHE, {
            files,
            timestamp: getTimestamp(),
          })
        } */
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

  public notify() {
    // Only rerender if resolveWebviewView() has been called
    if (this._view !== undefined) {
      this.render()
    }
  }

  public refresh(isRerender = false) {
    if (isRerender) {
      this.render()
    } else {
      vscode.commands.executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, false)
      this._ctx.globalState.update(EXT_WSSTATE_CACHE, undefined)
      store.dispatch(fetchNew())
    }
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView

    store.subscribe(() => {
      this.render()
      this.stateChanged(store.getState().ws)
    })

    this.setupWebview(webviewView)
    this.updateSearch()
    this.updateSort()

    const cachedFiles = this.getCacheFiles()

    if (cachedFiles) {
      //sstore.dispatch(list(cachedFiles))
      store.dispatch(fetchNew())
    } else {
      store.dispatch(fetchNew())
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

  public updateSort() {
    const sort = this._ctx.globalState.get<SortIds>(EXT_SORT) ?? 'ascending'
    store.dispatch(setSort({ sort }))
  }

  public updateVisibleFiles() {
    store.dispatch(setVisibleFiles())
  }
}
