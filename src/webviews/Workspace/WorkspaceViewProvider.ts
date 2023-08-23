import crypto from 'crypto';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { SortIds } from '../../commands/registerCommands';
import { getActionsConfig } from '../../config/getConfig';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_VSC_OPEN_SETTINGS,
  CMD_VSC_SAVE_WS_AS,
  CMD_VSC_SET_CTX,
} from '../../constants/commands';
import { ConfigActions } from '../../constants/config';
import {
  EXT_LOADED,
  EXT_SORT,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
} from '../../constants/ext';
import { store } from '../../store/redux';
import { getHtml } from '../../templates/getHtml';
import { defaultTemplate } from '../../templates/workspace/templates/defaultTemplate';
import { GlobalState } from '../../types/ext';
import { HtmlData, PostMessage } from '../webviews.interface';
import {
  WorkspacePmActions as Actions,
  FolderState,
  WorkspacePmPayload as Payload,
  WorkspaceCache,
  WorkspaceState,
} from './WorkspaceViewProvider.interface';
import { fetch } from './store/fetch';
import { workspaceSlice } from './store/workspaceSlice';

const { executeCommand } = vscode.commands;
const {
  list,
  setFileTree,
  setPersistedState,
  setSearch,
  setVisibleFiles,
  toggleFolderState,
  toggleFolderStateBulk,
} = workspaceSlice.actions;

export class WorkspaceViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = EXT_WEBVIEW_WS;
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _globalState: GlobalState
  ) {}

  public focusInput() {
    if (this._view?.visible) {
      this._view.webview.postMessage({ action: Actions.FOCUS_SEARCH });
    }
  }

  private getCacheFiles() {
    const cachedData = this._globalState.get<WorkspaceCache>(EXT_WSSTATE_CACHE);

    if (cachedData) {
      const { files, timestamp } = cachedData;

      if (files && timestamp) {
        const timestampNow = this.getTimestamp();
        const timestampExpired = timestamp + EXT_WSSTATE_CACHE_DURATION;

        if (timestampNow < timestampExpired) {
          return [...files];
        } else {
          this._globalState.update(EXT_WSSTATE_CACHE, undefined);
        }
      }
    }

    return null;
  }

  private getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  private getViewTitle({ files, visibleFiles, search, state: view }: WorkspaceState) {
    let viewTitle = t('webViews.workspace.list.title');

    if (view === 'list' && files !== null) {
      viewTitle = t(
        search
          ? 'webViews.workspace.list.titleCount.searched'
          : 'webViews.workspace.list.titleCount.default',
        {
          matches: visibleFiles.length.toString(),
          total: files.length.toString(),
        }
      );
    }

    return viewTitle;
  }

  public refresh(isRerender = false) {
    if (isRerender) {
      this.render();
    } else {
      vscode.commands.executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, false);
      this._globalState.update(EXT_WSSTATE_CACHE, undefined);
      store.dispatch(fetch());
    }
  }

  private render() {
    if (this._view !== undefined) {
      const state = store.getState().ws;
      this._view.title = this.getViewTitle(state);

      const htmlData: HtmlData<WorkspaceState> = {
        data: { ...state },
        title: this._view.title,
        webview: this._view.webview,
      };

      this._view.webview.html = getHtml<WorkspaceState>(
        {
          extensionPath: this._extensionUri,
          template: defaultTemplate,
          htmlData,
        },
        crypto.randomBytes(16).toString('hex')
      );
    } else {
      vscode.window.showErrorMessage(t('errors.viewNotFound'));
    }
  }

  public toggleAllFolders(type: FolderState) {
    store.dispatch(toggleFolderStateBulk(type));
  }

  public updateFileTree() {
    store.dispatch(setFileTree());
  }

  public updateSort() {
    const sort = this._globalState.get<SortIds>(EXT_SORT) ?? 'ascending';
    store.dispatch(setPersistedState({ sort }));
  }

  public updateVisibleFiles() {
    store.dispatch(setVisibleFiles());
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    store.subscribe(() => {
      this.render();
      this.stateChanged(store.getState().ws);
    });

    this.setupWebview(webviewView);
    this.updateSort();

    const cachedFiles = this.getCacheFiles();

    if (cachedFiles) {
      store.dispatch(list(cachedFiles));
    } else {
      store.dispatch(fetch());
    }
  }

  private setupWebview(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.onDidReceiveMessage((message: PostMessage<Payload, Actions>) => {
      const { action, payload } = message;

      switch (action) {
        case Actions.FOLDER_CLICK:
          if (payload !== undefined) {
            store.dispatch(toggleFolderState(payload.toString()));
          }
          break;

        case Actions.ICON_CLICK:
        case Actions.MAIN_CLICK:
          if (payload) {
            const clickAction = getActionsConfig();
            let cmd =
              clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_NEW_WIN : CMD_OPEN_CUR_WIN;

            if (action === Actions.ICON_CLICK) {
              cmd = clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_CUR_WIN : CMD_OPEN_NEW_WIN;
            }

            executeCommand(cmd, payload, true);
          }
          break;

        case Actions.SAVE_WS:
          executeCommand(CMD_VSC_SAVE_WS_AS);
          break;

        case Actions.SEARCH:
          if (payload !== undefined) {
            store.dispatch(setSearch({ term: payload.toString() }));
          }
          break;

        case Actions.SEARCH_CHECKBOX_DISABLE:
        case Actions.SEARCH_CHECKBOX_ENABLE:
          if (payload !== undefined) {
            const searchState = {
              [payload]: action === Actions.SEARCH_CHECKBOX_ENABLE,
            };

            store.dispatch(setSearch(searchState));
          }
          break;

        case Actions.SHOW_SETTINGS:
          executeCommand(CMD_VSC_OPEN_SETTINGS, 'workspaceSidebar');
          break;

        default:
          break;
      }
    });
  }

  private stateChanged(newState: WorkspaceState) {
    const { files, state } = newState;

    switch (state) {
      case 'error':
      case 'invalid':
        executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, true);
        break;

      case 'list':
        executeCommand(CMD_VSC_SET_CTX, EXT_LOADED, true);

        if (files) {
          this._globalState.update(EXT_WSSTATE_CACHE, {
            files,
            timestamp: this.getTimestamp(),
          });
        }
        break;

      default:
        break;
    }
  }
}
