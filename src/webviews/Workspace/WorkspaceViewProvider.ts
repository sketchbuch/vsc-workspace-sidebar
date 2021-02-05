import * as vscode from 'vscode';
import { SortIds } from '../../commands/registerCommands.interface';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  EXT_LOADED,
  EXT_SORT,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
  NONCE_CHARS,
} from '../../constants';
import { store } from '../../store/store';
import { getHtml } from '../../templates';
import { defaultTemplate as template } from '../../templates/workspace';
import { GlobalState } from '../../types';
import { getNonce } from '../../utils/security/getNonce';
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
const { list, setPersistedState } = workspaceSlice.actions;

export class WorkspaceViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = EXT_WEBVIEW_WS;
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _globalState: GlobalState
  ) {}

  private getCacheFiles() {
    const cachedData = this._globalState.get<WorkspaceCache>(EXT_WSSTATE_CACHE);

    if (cachedData) {
      const { files, timestamp } = cachedData;

      if (files && timestamp) {
        const timestampNow = Math.floor(Date.now() / 1000);
        const timestampExpired = timestamp + EXT_WSSTATE_CACHE_DURATION;

        if (timestampNow < timestampExpired) {
          return files;
        } else {
          this._globalState.update(EXT_WSSTATE_CACHE, undefined);
        }
      }
    }

    return null;
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
      const htmlData: HtmlData<WorkspaceState> = {
        data: { ...store.getState().ws },
        webview: this._view.webview,
      };

      this._view.webview.html = getHtml<WorkspaceState>(
        {
          extensionPath: this._extensionUri,
          template,
          htmlData,
        },
        getNonce(NONCE_CHARS, Math.random())
      );
    }
  }

  public updateSort() {
    const sort = this._globalState.get<SortIds>(EXT_SORT) ?? 'ascending';
    store.dispatch(setPersistedState({ sort }));
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
        case Actions.OPEN_CUR_WINDOW:
          if (payload) {
            executeCommand(CMD_OPEN_CUR_WIN, payload, true);
          }
          break;

        case Actions.OPEN_NEW_WINDOW:
          if (payload) {
            executeCommand(CMD_OPEN_NEW_WIN, payload, true);
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
            timestamp: Math.floor(Date.now() / 1000),
          });
        }
        break;

      default:
        break;
    }
  }
}
