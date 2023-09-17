import * as fs from 'fs'
import JSON5 from 'json5'
import * as path from 'path'
import * as vscode from 'vscode'
import {
  GetThemeData,
  ObserverableThemeProcessor,
  ThemeCacheData,
  ThemeFontDefinition,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconDefs,
  ThemeJsonIconMap,
  ThemeJsonIconSingle,
  ThemeProcessorObserver,
  ThemeProcessorState,
} from './ThemeProcessor.interface'
import { getActiveExtThemeData } from './utils/theme/getActiveExtThemeData'
import { isHighContrastTheme } from './utils/theme/isHighContrastTheme'
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
    this._observers.forEach((observer) => {
      observer.notify()
    })
  }

  private async processThemeData() {
    this._state = 'loading'
    await this.deleteThemeData()

    const activeFileiconTheme = this.getFileiconTheme()
    const activeExtThemeData = await getActiveExtThemeData(activeFileiconTheme)

    if (activeExtThemeData !== null) {
      const themePath = path.join(activeExtThemeData.extPath, activeExtThemeData.themePath)

      try {
        const isLight = isLightTheme(vscode.window.activeColorTheme)
        const isHighContrast = isHighContrastTheme(vscode.window.activeColorTheme)
        const jsonContent = fs.readFileSync(themePath, 'utf8')
        const jsonData = JSON5.parse(jsonContent) as ThemeJson

        let fontsData: ThemeFontDefinition[] = []

        if (jsonData.fonts) {
          fontsData = [...jsonData.fonts].map((font) => {
            const { dir } = path.parse(themePath)
            const newPath = path.join(dir, font.src[0].path)

            return {
              ...font,
              src: [{ ...font.src[0], path: newPath }],
            }
          })
        }

        const newIconDefinitions: ThemeJsonIconDefs = {}

        Object.keys(jsonData.iconDefinitions).forEach((iconKey: string) => {
          const oldDef = jsonData.iconDefinitions[iconKey]
          const newDef: ThemeJsonIconDef = { ...oldDef }

          if (oldDef.iconPath) {
            let cleanedPath = oldDef.iconPath

            if (cleanedPath.startsWith('./')) {
              const { dir } = path.parse(activeExtThemeData.themePath)
              cleanedPath = cleanedPath.replace('./', `${dir}/`)
            } else if (cleanedPath.startsWith('/..')) {
              cleanedPath = cleanedPath.replace('/..', '')
            }

            newDef.iconPath = path.join(activeExtThemeData.extPath, cleanedPath)
          } else if (!newDef.fontId && fontsData.length === 1) {
            newDef.fontId = fontsData[0].id
          } // Multiple fonts, id must already be set

          newIconDefinitions[iconKey] = newDef
        })

        // Some themes seem not to include fontCharacter in light
        if (isLight) {
          const darkKeys = Object.keys(newIconDefinitions).filter((key) => !key.includes('_light'))
          darkKeys.forEach((key) => {
            const darkElement = newIconDefinitions[key]
            const lightElement = newIconDefinitions[`${key}_light`]

            if (lightElement) {
              newIconDefinitions[`${key}_light`] = { ...darkElement, ...lightElement }
            }
          })
        }

        let fileExtensions: ThemeJsonIconMap = { ...(jsonData.fileExtensions ?? {}) }
        let fileIcon: ThemeJsonIconSingle = jsonData.file ?? undefined
        let fileNames: ThemeJsonIconMap = { ...(jsonData.fileNames ?? {}) }
        let folderExpanded: ThemeJsonIconSingle = jsonData.folderExpanded ?? undefined
        let folderIcon: ThemeJsonIconSingle = jsonData.folder ?? undefined
        let folderNames: ThemeJsonIconMap = { ...(jsonData.folderNames ?? {}) }
        let folderNamesExpanded: ThemeJsonIconMap = { ...(jsonData.folderNamesExpanded ?? {}) }
        let languageIds: ThemeJsonIconMap = { ...(jsonData.languageIds ?? {}) }
        let rootFolder: ThemeJsonIconSingle = jsonData.rootFolder ?? undefined
        let rootFolderExpanded: ThemeJsonIconSingle = jsonData.rootFolderExpanded ?? undefined

        if (isLight && jsonData.light) {
          fileExtensions = { ...fileExtensions, ...(jsonData.light.fileExtensions ?? {}) }
          fileIcon = jsonData.light.file ?? fileIcon
          fileNames = { ...fileNames, ...(jsonData.light.fileNames ?? {}) }
          folderExpanded = jsonData.light.folderExpanded ?? folderExpanded
          folderIcon = jsonData.light.folder ?? folderIcon
          folderNames = { ...folderNames, ...(jsonData.light.folderNames ?? {}) }
          folderNamesExpanded = {
            ...folderNamesExpanded,
            ...(jsonData.light.folderNamesExpanded ?? {}),
          }
          languageIds = { ...languageIds, ...(jsonData.light.languageIds ?? {}) }
          rootFolder = jsonData.light.rootFolder ?? rootFolder
          rootFolderExpanded = jsonData.light.rootFolderExpanded ?? rootFolderExpanded
        }

        if (isHighContrast && jsonData.highContrast) {
          fileExtensions = { ...fileExtensions, ...(jsonData.highContrast.fileExtensions ?? {}) }
          fileIcon = jsonData.highContrast.file ?? fileIcon
          fileNames = { ...fileNames, ...(jsonData.highContrast.fileNames ?? {}) }
          folderExpanded = jsonData.highContrast.folderExpanded ?? folderExpanded
          folderIcon = jsonData.highContrast.folder ?? folderIcon
          folderNames = { ...folderNames, ...(jsonData.highContrast.folderNames ?? {}) }
          folderNamesExpanded = {
            ...folderNamesExpanded,
            ...(jsonData.highContrast.folderNamesExpanded ?? {}),
          }
          languageIds = { ...languageIds, ...(jsonData.highContrast.languageIds ?? {}) }
          rootFolder = jsonData.highContrast.rootFolder ?? rootFolder
          rootFolderExpanded = jsonData.highContrast.rootFolderExpanded ?? rootFolderExpanded
        }

        const themeCacheData: ThemeCacheData = {
          localResourceRoots: [activeExtThemeData.extPath],
          themeData: {
            file: fileIcon,
            fileExtensions,
            fileNames,
            folder: folderIcon,
            folderExpanded,
            folderNames,
            folderNamesExpanded,
            fonts: fontsData,
            iconDefinitions: newIconDefinitions,
            languageIds,
            rootFolder,
            rootFolderExpanded,
          },
          themeId: activeFileiconTheme,
          timestamp: this.getTimestamp(),
        }

        await this.setThemeData(themeCacheData)
        this._state = 'data-ready'
      } catch (error) {
        this._state = 'error'

        if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
          vscode.window.showErrorMessage('Unable to process theme json:' + error)
        }
      }
    } else {
      this._state = 'error'

      if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
        vscode.window.showErrorMessage(`Active theme not found: "${activeFileiconTheme}"`)
      }
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
      localResourceRoots: themeData?.localResourceRoots ?? [],
      state: this._state,
      themeId: themeData?.themeId ?? null,
    }
  }

  public subscribe(observer: ThemeProcessorObserver) {
    this._observers.add(observer)
  }

  public unsubscribe(observer: ThemeProcessorObserver) {
    this._observers.delete(observer)
  }
}
