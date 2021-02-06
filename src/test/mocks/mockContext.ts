import * as path from 'path';
import * as vscode from 'vscode';

export const extensionPath = path.resolve(`${__dirname}/../../..`);

export const getMockContext = () => {
  return {
    asAbsolutePath: (relativePath: string) => relativePath,
    extensionPath,
    environmentVariableCollection: {} as vscode.EnvironmentVariableCollection,
    extensionMode: vscode.ExtensionMode.Test,
    extensionUri: {} as vscode.Uri,
    globalState: {
      get: (key: string) => {
        // Do nothing...
      },
      setKeysForSync: (keys: string[]) => {},
      update: (key: string, value: never) => Promise.resolve(),
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
      update: (key: string, value: never) => Promise.resolve(),
    } as vscode.Memento,
  } as vscode.ExtensionContext;
};
