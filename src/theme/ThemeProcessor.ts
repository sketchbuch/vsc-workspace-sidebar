import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import {
  ObserverableThemeProcessor,
  ThemeCacheData,
  ThemeData,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconDefs,
  ThemeProcessorObserver,
} from './ThemeProcessor.interface'
import { getActiveExtThemeData } from './utils/getActiveExtThemeData'
import { isLightTheme } from './utils/isLightTheme'

export class ThemeProcessor implements ObserverableThemeProcessor {
  private _observers: Set<ThemeProcessorObserver>
  private readonly _cacheDuration = 604800 // 1 Week
  private readonly _cacheKey = `themeProcessor-cache`
  private readonly _defaultTheme = 'vs-seti'

  constructor(private readonly _ctx: vscode.ExtensionContext) {
    this._observers = new Set()
    this.watchConfig()
    this.init()
  }

  private getFileiconTheme = (): string => {
    return vscode.workspace.getConfiguration('workbench').iconTheme ?? this._defaultTheme
  }

  private getFullThemeData(): ThemeCacheData | null {
    return this._ctx.globalState.get<ThemeCacheData>(this._cacheKey) ?? null
  }

  private getTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }

  private init() {
    let cacheMiss = true
    const activeFileiconTheme = this.getFileiconTheme()
    const cachedData = this.getFullThemeData()

    if (cachedData) {
      const { themeData, themeId, timestamp } = cachedData

      if (themeData && timestamp && themeId && themeId === activeFileiconTheme) {
        const timestampNow = this.getTimestamp()
        const timestampExpired = timestamp + this._cacheDuration

        if (timestampNow < timestampExpired) {
          cacheMiss = false
        }
      }
    }

    if (cacheMiss) {
      this.deleteThemeData()
      this.processThemeData()
    } else {
      // this.notifyAll()
      this.deleteThemeData()
      this.processThemeData()
    }
  }

  private notifyAll() {
    this._observers.forEach((observer) => {
      observer.notify()
    })
  }

  private async processThemeData() {
    const activeFileiconTheme = this.getFileiconTheme()
    const activeExtThemeData = await getActiveExtThemeData(activeFileiconTheme)

    if (activeExtThemeData !== null) {
      const themePath = path.join(activeExtThemeData.extPath, activeExtThemeData.themePath)

      try {
        const isLight = isLightTheme(vscode.window.activeColorTheme)
        const jsonContent = fs.readFileSync(themePath, 'utf8')
        const jsonData = JSON.parse(jsonContent) as ThemeJson
        const newIconDefinitions: ThemeJsonIconDefs = {}

        Object.keys(jsonData.iconDefinitions).forEach((iconKey: string) => {
          const oldDef = jsonData.iconDefinitions[iconKey]
          const newDef: ThemeJsonIconDef = { ...oldDef }

          if (oldDef.iconPath) {
            newDef.iconPath = path.join(
              activeExtThemeData.extPath,
              oldDef.iconPath.replace('/..', '')
            )
          }

          newIconDefinitions[iconKey] = newDef
        })

        const fontDataWithFullPaths = [...jsonData.fonts].map((font) => {
          const { dir } = path.parse(themePath)
          const newPath = path.join(dir, font.src[0].path)

          return {
            ...font,
            src: [{ ...font.src[0], path: newPath }],
          }
        })

        const themeCacheData: ThemeCacheData = {
          themeData: {
            iconDefinitions: newIconDefinitions,
            fileExtensions: isLight ? jsonData.light.fileExtensions : jsonData.fileExtensions,
            fileNames: isLight ? jsonData.light.fileNames : jsonData.fileNames,
            languageIds: isLight ? jsonData.light.languageIds : jsonData.languageIds,
            fonts: fontDataWithFullPaths,
          },
          themeId: activeFileiconTheme,
          timestamp: this.getTimestamp(),
        }

        this.setThemeData(themeCacheData)
      } catch {
        if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
          vscode.window.showErrorMessage('Unable to process theme json')
        }
      }
    } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
      vscode.window.showErrorMessage(`Active theme not found: "${activeFileiconTheme}"`)
    }

    this.notifyAll()
  }

  private watchConfig() {
    const configChange = vscode.workspace.onDidChangeConfiguration(
      (event: vscode.ConfigurationChangeEvent) => {
        const { affectsConfiguration } = event

        if (affectsConfiguration('workbench.iconTheme')) {
          this.deleteThemeData()
          this.processThemeData()
        }
      }
    )

    this._ctx.subscriptions.push(configChange)
  }

  /**
   * Delete cached theme data.
   */
  public deleteThemeData() {
    this._ctx.globalState.update(this._cacheKey, undefined)
  }

  /**
   * Get cached theme data.
   */
  public getThemeData(): ThemeData | null {
    return this.getFullThemeData()?.themeData ?? null
  }

  /**
   * Set cached theme data.
   *
   * @param {ThemeCacheData} data The data to write to the cache
   */
  public setThemeData(data: ThemeCacheData) {
    this._ctx.globalState.update(this._cacheKey, data)
  }

  /**
   * Subscribe to file theme changes.
   *
   * @param {ThemeProcessorObserver} observer The subscriber
   */
  public subscribe(observer: ThemeProcessorObserver) {
    this._observers.add(observer)
  }

  /**
   * Unsubscribe to file theme changes.
   *
   * @param {ThemeProcessorObserver} observer The unsubscriber
   */
  public unsubscribe(observer: ThemeProcessorObserver) {
    this._observers.delete(observer)
  }
}
