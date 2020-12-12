import * as vscode from 'vscode';
import {
  EXT_LOADED,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
} from '../../constants';
import { getHtml } from '../../templates';
import { defaultTemplate as template } from '../../templates/workspace';
import { WsListCache } from '../../treeviews/WsList/WsList.interface';
import { GlobalState } from '../../types';
import { HtmlData } from '../webviews.interface';
import { workspaceState } from './state';
import { WorkspaceContext, WorkspaceMachine } from './state.interface';
import { WorkspaceData, WorkspaceState } from './WorkspaceViewProvider.interface';

export class WorkspaceViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = EXT_WEBVIEW_WS;
  private _view?: vscode.WebviewView;
  private _state?: WorkspaceMachine;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _globalState: GlobalState
  ) {}

  private getCacheFiles() {
    const cachedData = this._globalState.get<WsListCache>(EXT_WSSTATE_CACHE);

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

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    webviewContext: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    this._state = workspaceState;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    if (!this._state.initialized) {
      this._state
        .onTransition((state) => {
          this.render(state.context);
        })
        .onChange((context) => {
          this.stateChanged(context);
        })
        .start();
    }

    const cachedFiles = this.getCacheFiles();

    if (cachedFiles) {
      this._state.send('USE_CACHE', { cachedFiles });
    } else {
      this._state.send('FETCH');
    }
  }

  private stateChanged(context: WorkspaceContext) {
    const { files, state } = context;

    switch (state) {
      case 'error':
        vscode.commands.executeCommand('setContext', EXT_LOADED, true);
        break;

      case 'list':
        vscode.commands.executeCommand('setContext', EXT_LOADED, true);

        this._globalState.update(EXT_WSSTATE_CACHE, {
          files,
          timestamp: Math.floor(Date.now() / 1000),
        });
        break;

      default:
        break;
    }
  }

  private render(state: WorkspaceState) {
    if (this._view) {
      const htmlData: HtmlData<WorkspaceData> = {
        data: { ...state },
        webview: this._view.webview,
      };

      this._view.webview.html = getHtml<WorkspaceData>({
        extensionPath: this._extensionUri,
        template,
        htmlData,
      });
    }
  }
}
