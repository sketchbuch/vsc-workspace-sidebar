import * as path from 'path'
import * as vscode from 'vscode'
import { getMockUri } from './mockExtensionUri'

interface MockStorage {
  [key: string]: unknown
}

export const extensionPath = path.resolve(`${__dirname}/../../..`)

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms))

export const getMockContext = () => {
  const storage: MockStorage = {}

  return {
    asAbsolutePath: (relativePath: string) => relativePath,
    extension: {} as vscode.Extension<{}>,
    extensionPath,
    environmentVariableCollection: {} as unknown,
    extensionMode: vscode.ExtensionMode.Test,
    extensionUri: getMockUri(),
    globalState: {
      get: (key: string) => {
        return storage[key] ?? null
      },
      keys: () => [],
      setKeysForSync: (keys: string[]) => {},
      update: async (key: string, value: any) => {
        await sleep(1)

        if (value === undefined) {
          delete storage[key]
        } else {
          storage[key] = value
        }

        return Promise.resolve()
      },
    } as vscode.Memento & { setKeysForSync(keys: string[]): void },
    globalStoragePath: '',
    globalStorageUri: {} as vscode.Uri,
    languageModelAccessInformation: {} as vscode.LanguageModelAccessInformation,
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
      keys: () => [],
      update: (key: string, value: never) => Promise.resolve(),
    } as vscode.Memento,
  } as vscode.ExtensionContext
}
