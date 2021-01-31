import * as vscode from 'vscode';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  EXT_LOADED,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
} from '../../constants';
import { getHtml } from '../../templates';
import { defaultTemplate as template } from '../../templates/workspace';
import { GlobalState } from '../../types';
import { HtmlData, PostMessage } from '../webviews.interface';
import { workspaceState } from './state';
import { WorkspaceContext, WorkspaceMachine } from './state.interface';
import {
  WorkspaceCache,
  WorkspacePmActions as Actions,
  WorkspacePmPayload as Payload,
} from './WorkspaceViewProvider.interface';

// const isActive = !!vscode.workspace.workspaceFile && vscode.workspace.workspaceFile.fsPath === file;

const { executeCommand } = vscode.commands;

export class WorkspaceViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = EXT_WEBVIEW_WS;
  private _view?: vscode.WebviewView;
  private _state?: WorkspaceMachine;

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

  public refresh() {
    this.render(this._state?.state.context);
  }

  private render(state: WorkspaceContext | undefined) {
    if (state && this._view) {
      const htmlData: HtmlData<WorkspaceContext> = {
        data: { ...state },
        webview: this._view.webview,
      };

      this._view.webview.html = getHtml<WorkspaceContext>({
        extensionPath: this._extensionUri,
        template,
        htmlData,
      });
    }
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    webviewContext: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    this._state = workspaceState;

    this.setupWebview(webviewView);
    this.setupState();

    const cachedFiles = this.getCacheFiles();

    if (cachedFiles) {
      this._state.send('USE_CACHE', { cachedFiles });
    } else {
      this._state.send('FETCH');
    }
  }

  private setupState() {
    if (this._state && !this._state.initialized) {
      this._state
        .onTransition((state) => {
          this.render(state.context);
        })
        .onChange((context) => {
          this.stateChanged(context);
        })
        .start();
    }
  }

  private setupWebview(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.onDidReceiveMessage((message: PostMessage<Payload, Actions>) => {
      const { action, payload } = message;

      if (payload) {
        switch (action) {
          case Actions.OPEN_CUR_WINDOW:
            executeCommand(CMD_OPEN_CUR_WIN, payload.file, true);
            break;

          case Actions.OPEN_NEW_WINDOW:
            executeCommand(CMD_OPEN_NEW_WIN, payload.file, true);
            break;

          default:
            break;
        }
      }
    });
  }

  private stateChanged(context: WorkspaceContext) {
    const { files, state } = context;

    switch (state) {
      case 'error':
        executeCommand('setContext', EXT_LOADED, true);
        break;

      case 'list':
        executeCommand('setContext', EXT_LOADED, true);

        this._globalState.update(EXT_WSSTATE_CACHE, {
          files,
          timestamp: Math.floor(Date.now() / 1000),
        });
        break;

      default:
        break;
    }
  }
}
