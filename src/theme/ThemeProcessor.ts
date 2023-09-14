import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import {
  GetThemeData,
  ObserverableThemeProcessor,
  ThemeCacheData,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconDefs,
  ThemeProcessorObserver,
  ThemeProcessorState,
} from './ThemeProcessor.interface'
import { getActiveExtThemeData } from './utils/theme/getActiveExtThemeData'
import { isLightTheme } from './utils/theme/isLightTheme'

export class ThemeProcessor implements ObserverableThemeProcessor {
  private _observers: Set<ThemeProcessorObserver>
  private readonly _cacheDuration = 604800 // 1 Week
  private readonly _cacheKey = `themeProcessor-cache`
  private readonly _defaultTheme = 'vs-seti'
  private _state: ThemeProcessorState = 'idle'

  constructor(private readonly _ctx: vscode.ExtensionContext) {
    this._observers = new Set()
    this.watchConfig()
    this.init()
  }

  private async deleteThemeData(): Promise<void> {
    return this._ctx.globalState.update(this._cacheKey, undefined)
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
      this.processThemeData()
    } else {
      // this._state = 'data-ready'
      // this.notifyAll()
      this.processThemeData()
    }
  }

  private notifyAll() {
    console.log('### notifyAll()')
    this._observers.forEach((observer) => {
      observer.notify()
    })
  }

  private async processThemeData() {
    console.log('### processThemeData() 1')
    this._state = 'loading'
    await this.deleteThemeData()

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

        await this.setThemeData(themeCacheData)
        console.log('### processThemeData() 2 - theme data processed')
        this._state = 'data-ready'
      } catch {
        this._state = 'error'
        if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
          vscode.window.showErrorMessage('Unable to process theme json')
        }
      }
    } else if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
      this._state = 'error'
      vscode.window.showErrorMessage(`Active theme not found: "${activeFileiconTheme}"`)
    }

    this.notifyAll()
  }

  private async setThemeData(data: ThemeCacheData): Promise<void> {
    return this._ctx.globalState.update(this._cacheKey, data)
  }

  private watchConfig() {
    const configChange = vscode.workspace.onDidChangeConfiguration(
      (event: vscode.ConfigurationChangeEvent) => {
        const { affectsConfiguration } = event

        if (affectsConfiguration('workbench.iconTheme')) {
          this.processThemeData()
        }
      }
    )

    this._ctx.subscriptions.push(configChange)
  }

  /**
   * Get cached theme data.
   */
  public getThemeData(): GetThemeData {
    const themeData = this.getFullThemeData() ?? null

    return {
      data: themeData?.themeData ?? null,
      state: this._state,
      themeId: themeData?.themeId ?? null,
    }
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
