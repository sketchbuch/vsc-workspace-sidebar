import crypto from 'crypto';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { SortIds } from '../../commands/registerCommands';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  ConfigActions,
  EXT_LOADED,
  EXT_SORT,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
} from '../../constants';
import { store } from '../../store/redux';
import { getHtml } from '../../templates';
import { defaultTemplate as template } from '../../templates/workspace';
import { GlobalState } from '../../types';
import { HtmlData, PostMessage } from '../webviews.interface';
import { fetch } from './store/fetch';
import { workspaceSlice } from './store/workspaceSlice';
import {
  WorkspaceCache,
  WorkspacePmActions as Actions,
  WorkspacePmPayload as Payload,
  WorkspaceState,
} from './WorkspaceViewProvider.interface';

const { executeCommand } = vscode.commands;
const { list, setPersistedState, setSearchTerm, setShowPaths } = workspaceSlice.actions;

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
    let viewTitle = t('views.title');

    if (view === 'list' && files !== false) {
      viewTitle = t(
        search ? 'webViews.workspace.titleListSearched' : 'webViews.workspace.titleList',
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
      vscode.commands.executeCommand('setContext', EXT_LOADED, false);
      this._globalState.update(EXT_WSSTATE_CACHE, undefined);
      store.dispatch(fetch());
    }
  }

  private render() {
    if (this._view) {
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
          template,
          htmlData,
        },
        crypto.randomBytes(16).toString('hex')
      );
    } else {
      vscode.window.showErrorMessage(t('errors.viewNotFound'));
    }
  }

  public updateSort() {
    const sort = this._globalState.get<SortIds>(EXT_SORT) ?? 'ascending';
    store.dispatch(setPersistedState({ sort }));
  }

  public updatePaths() {
    store.dispatch(setShowPaths());
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
        case Actions.MAIN_CLICK:
        case Actions.ICON_CLICK:
          if (payload) {
            const clickAction: string =
              vscode.workspace.getConfiguration().get('workspaceSidebar.actions') ??
              ConfigActions.CURRENT_WINDOW;
            let cmd =
              clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_NEW_WIN : CMD_OPEN_CUR_WIN;

            if (action === Actions.ICON_CLICK) {
              cmd = clickAction === ConfigActions.NEW_WINDOW ? CMD_OPEN_CUR_WIN : CMD_OPEN_NEW_WIN;
            }

            executeCommand(cmd, payload, true);
          }
          break;

        case Actions.SEARCH:
          if (payload !== undefined) {
            store.dispatch(setSearchTerm(payload));
          }
          break;

        case Actions.SHOW_SETTINGS:
          executeCommand('workbench.action.openSettings', 'workspaceSidebar');
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
        executeCommand('setContext', EXT_LOADED, true);
        break;

      case 'list':
        executeCommand('setContext', EXT_LOADED, true);

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
