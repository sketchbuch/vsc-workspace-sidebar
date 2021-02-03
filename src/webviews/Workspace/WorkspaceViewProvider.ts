import { Unsubscribe } from '@reduxjs/toolkit';
import * as vscode from 'vscode';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  EXT_LOADED,
  EXT_WEBVIEW_WS,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
} from '../../constants';
import { store } from '../../store/store';
import { getHtml } from '../../templates';
import { defaultTemplate as template } from '../../templates/workspace';
import { GlobalState } from '../../types';
import { HtmlData, PostMessage } from '../webviews.interface';
import { fetch, workspaceSlice } from './store/workspaceSlice';
import {
  WorkspaceCache,
  WorkspacePmActions as Actions,
  WorkspacePmPayload as Payload,
  WorkspaceState,
} from './WorkspaceViewProvider.interface';

const { executeCommand } = vscode.commands;

export class WorkspaceViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = EXT_WEBVIEW_WS;
  private _view?: vscode.WebviewView;
  private _unsubscribe?: Unsubscribe;

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
    this.render();
  }

  private render() {
    if (this._view) {
      const htmlData: HtmlData<WorkspaceState> = {
        data: { ...store.getState().ws },
        webview: this._view.webview,
      };

      this._view.webview.html = getHtml<WorkspaceState>({
        extensionPath: this._extensionUri,
        template,
        htmlData,
      });
    }
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    const { list } = workspaceSlice.actions;

    if (this._unsubscribe === undefined) {
      this._unsubscribe = store.subscribe(() => {
        this.render();
        this.stateChanged(store.getState().ws);
      });
    }

    this.setupWebview(webviewView);
    this.render();

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
