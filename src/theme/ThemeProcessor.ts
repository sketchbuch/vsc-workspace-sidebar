import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { ThemeCacheData, ThemeData, ThemeJson } from './ThemeProcessor.interface'
import { getActiveExtThemeData } from './getActiveExtThemeData'

export class ThemeProcessor {
  private readonly _cacheDuration = 604800 // 1 Week
  private readonly _cacheKey = `themeProcessor-cache`
  private readonly _workbenchConfigKey = 'workbench'

  constructor(
    private readonly _extMode: vscode.ExtensionMode,
    private readonly _globalState: vscode.Memento,
    private readonly _subscriptions: vscode.Disposable[]
  ) {
    this.watchConfig()
  }

  private getTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }

  private isLightTheme(): boolean {
    const { activeColorTheme } = vscode.window

    return activeColorTheme.kind === 1 || activeColorTheme.kind === 4
  }

  private async processThemeData() {
    console.log('### processThemeData')
    const activeFileiconTheme = vscode.workspace.getConfiguration('workbench').iconTheme
    const activeExtThemeData = await getActiveExtThemeData(activeFileiconTheme)

    if (activeExtThemeData !== null) {
      const themePath = path.join(activeExtThemeData.extPath, activeExtThemeData.themePath)

      try {
        const isLight = this.isLightTheme()
        const jsonContent = fs.readFileSync(themePath, 'utf8')
        const jsonData = JSON.parse(jsonContent) as ThemeJson

        const themeCacheData: ThemeCacheData = {
          themeData: {
            iconDefinitions: jsonData.iconDefinitions,
            fileExtensions: isLight ? jsonData.light.fileExtensions : jsonData.fileExtensions,
            fileNames: isLight ? jsonData.light.fileNames : jsonData.fileNames,
            languageIds: isLight ? jsonData.light.languageIds : jsonData.languageIds,
          },
          timestamp: this.getTimestamp(),
        }

        this.setThemeData(themeCacheData)
      } catch {
        if (this._extMode !== vscode.ExtensionMode.Production) {
          vscode.window.showErrorMessage('Unable to process theme json')
        }
      }
    } else if (this._extMode !== vscode.ExtensionMode.Production) {
      vscode.window.showErrorMessage('Active theme not found')
    }
  }

  private watchConfig() {
    const configChange = vscode.workspace.onDidChangeConfiguration(
      (event: vscode.ConfigurationChangeEvent) => {
        const { affectsConfiguration } = event

        if (affectsConfiguration(`${this._workbenchConfigKey}.iconTheme`)) {
          this.processThemeData()
        }
      }
    )

    this._subscriptions.push(configChange)
  }

  public init() {
    let shouldProcessData = true
    const cachedData = this._globalState.get<ThemeCacheData>(this._cacheKey)

    if (cachedData) {
      const { themeData, timestamp } = cachedData

      if (themeData && timestamp) {
        const timestampNow = this.getTimestamp()
        const timestampExpired = timestamp + this._cacheDuration

        if (timestampNow < timestampExpired) {
          shouldProcessData = false
        } else {
          this.deleteThemeData()
        }
      }
    }

    if (shouldProcessData) {
      this.processThemeData()
    }
  }

  public deleteThemeData() {
    this._globalState.update(this._cacheKey, undefined)
  }

  public getThemeData(): ThemeData | null {
    const cachedData = this._globalState.get<ThemeCacheData>(this._cacheKey)

    return cachedData?.themeData ?? null
  }

  public setThemeData(data: ThemeCacheData) {
    this._globalState.update(this._cacheKey, data)
  }
}
