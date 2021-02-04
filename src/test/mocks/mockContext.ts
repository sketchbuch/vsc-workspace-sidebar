import * as path from 'path';
import * as vscode from 'vscode';

export const extensionPath = path.resolve(`${__dirname}/../../..`);

export const mockContext = {
  asAbsolutePath: (relativePath: string) => relativePath,
  extensionPath,
  environmentVariableCollection: {} as vscode.EnvironmentVariableCollection,
  extensionMode: vscode.ExtensionMode.Test,
  extensionUri: {} as vscode.Uri,
  globalState: {
    get: (key: string) => {
      // Do nothing...
    },
    update: (key: string, value: never) => {
      // Do nothing...
    },
  } as vscode.Memento & { setKeysForSync(keys: string[]): void },
  globalStoragePath: '',
  globalStorageUri: {} as vscode.Uri,
  logPath: '',
  logUri: {} as vscode.Uri,
  secrets: {} as vscode.SecretStorage,
  storagePath: '',
  storageUri: undefined,
  subscriptions: [],
  workspaceState: {
    get: (key: string) => {
      // Do nothing...
    },
    update: (key: string, value: never) => {
      // Do nothing...
    },
  } as vscode.Memento,
} as vscode.ExtensionContext;
