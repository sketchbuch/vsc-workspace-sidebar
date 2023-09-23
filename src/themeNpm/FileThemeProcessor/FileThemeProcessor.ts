import * as fs from 'fs'
import JSON5 from 'json5'
import * as path from 'path'
import * as vscode from 'vscode'
import { getActiveExtThemeData } from '../utils/theme/getActiveExtThemeData'
import { isHighContrastTheme } from '../utils/theme/isHighContrastTheme'
import { isLightTheme } from '../utils/theme/isLightTheme'
import {
  FileThemeProcessorObserver,
  FileThemeProcessorState,
  GetThemeData,
  ObserverableFileThemeProcessor,
  ThemeCacheData,
  ThemeData,
  ThemeFontDefinition,
  ThemeIconAssociation,
  ThemeId,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconDefs,
  ThemeSessionCacheData,
} from './FileThemeProcessor.interface'

export class FileThemeProcessor implements ObserverableFileThemeProcessor {
  private _observers: Set<FileThemeProcessorObserver>
  private readonly _cacheDuration = 604800 // 1 Week
  private readonly _cacheKey = 'themeProcessor-cache'
  private _state: FileThemeProcessorState = 'idle'

  // globalState is used to store the data for the current theme.
  // This container stores data loaded during the current session to speed up reloading
  // If users try reloading a theme they already loaded.
  private _sessionCache: ThemeSessionCacheData = {}

  constructor(private readonly _ctx: vscode.ExtensionContext) {
    this._observers = new Set()
    this.watchConfig()
    this.init()
  }

  private async deleteThemeData(): Promise<void> {
    return this._ctx.globalState.update(this._cacheKey, undefined)
  }

  /**
   * If there is no icon theme set, the default theme will be returned, currently "vs-seti".
   * If file icons are disabled, null will be returned.
   */
  private getFileiconTheme = (): ThemeId => {
    return vscode.workspace.getConfiguration('workbench').iconTheme
  }

  private getFullThemeData(): ThemeCacheData | null {
    return this._ctx.globalState.get<ThemeCacheData>(this._cacheKey) ?? null
  }

  private getSessionCache(themeId: string): ThemeCacheData | null {
    return this._sessionCache[themeId] ?? null
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
          this.setSessionCache(activeFileiconTheme, cachedData)
        }
      }
    }

    if (cacheMiss) {
      this.processThemeData()
    } else {
      this._state = 'ready'
      this.notifyAll()
    }
  }

  private normaliseData = (
    jsonData: ThemeJson,
    isLight: boolean,
    isHighContrast: boolean
  ): ThemeData => {
    let themeData: ThemeData = {
      file: jsonData.file ?? undefined,
      fileExtensions: { ...(jsonData.fileExtensions ?? {}) },
      fileNames: { ...(jsonData.fileNames ?? {}) },
      folder: jsonData.folder ?? undefined,
      folderExpanded: jsonData.folderExpanded ?? undefined,
      folderNames: { ...(jsonData.folderNames ?? {}) },
      folderNamesExpanded: { ...(jsonData.folderNamesExpanded ?? {}) },
      fonts: [],
      iconDefinitions: {},
      languageIds: { ...(jsonData.languageIds ?? {}) },
      rootFolder: jsonData.rootFolder ?? undefined,
      rootFolderExpanded: jsonData.rootFolderExpanded ?? undefined,
    }

    themeData = this.normaliseDeepData(themeData, isLight, jsonData.light)
    themeData = this.normaliseDeepData(themeData, isHighContrast, jsonData.highContrast)

    return themeData
  }

  private normaliseDeepData = (
    themeData: ThemeData,
    isThemeDeepDataType: boolean,
    deepData?: ThemeIconAssociation
  ): ThemeData => {
    if (isThemeDeepDataType && deepData) {
      return {
        ...themeData,
        fileExtensions: { ...themeData.fileExtensions, ...(deepData.fileExtensions ?? {}) },
        file: deepData.file ?? themeData.file,
        fileNames: { ...themeData.fileNames, ...(deepData.fileNames ?? {}) },
        folderExpanded: deepData.folderExpanded ?? themeData.folderExpanded,
        folder: deepData.folder ?? themeData.folder,
        folderNames: { ...themeData.folderNames, ...(deepData.folderNames ?? {}) },
        folderNamesExpanded: {
          ...themeData.folderNamesExpanded,
          ...(deepData.folderNamesExpanded ?? {}),
        },
        languageIds: { ...themeData.languageIds, ...(deepData.languageIds ?? {}) },
        rootFolder: deepData.rootFolder ?? themeData.rootFolder,
        rootFolderExpanded: deepData.rootFolderExpanded ?? themeData.rootFolderExpanded,
      }
    }

    return themeData
  }

  private notifyAll() {
    this._observers.forEach((observer) => {
      observer.notify()
    })
  }

  private async processThemeData() {
    try {
      this._state = 'loading'
      this.notifyAll() // Let webviews handle loading if they want

      await this.deleteThemeData()
      const activeFileiconTheme = this.getFileiconTheme()

      // File icon themes disabled
      if (activeFileiconTheme === null) {
        this._state = 'ready'
        this.notifyAll()

        return
      }

      const sessionCacheData = this.getSessionCache(activeFileiconTheme)

      if (sessionCacheData) {
        await this.setThemeData(sessionCacheData)

        this._state = 'ready'
        this.notifyAll()

        return
      }

      const activeExtThemeData = await getActiveExtThemeData(activeFileiconTheme)

      if (activeExtThemeData === null) {
        if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
          vscode.window.showErrorMessage(`Active theme not found: "${activeFileiconTheme}"`)
        }

        this._state = 'error'
        this.notifyAll()

        return
      }

      const themePath = path.join(activeExtThemeData.extPath, activeExtThemeData.themePath)
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

      const isLight = isLightTheme(vscode.window.activeColorTheme)
      const isHighContrast = isHighContrastTheme(vscode.window.activeColorTheme)

      // Some themes seem not to include fontCharacter in light
      // so overlay light on to dark to get full props
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

      const themeCacheData: ThemeCacheData = {
        localResourceRoots: [activeExtThemeData.extPath],
        themeData: {
          ...this.normaliseData(jsonData, isLight, isHighContrast),
          fonts: fontsData,
          iconDefinitions: newIconDefinitions,
        },
        themeId: activeFileiconTheme,
        timestamp: this.getTimestamp(),
      }

      this.setSessionCache(activeFileiconTheme, themeCacheData)
      await this.setThemeData(themeCacheData)

      this._state = 'ready'
      this.notifyAll()
    } catch (error) {
      if (this._ctx.extensionMode !== vscode.ExtensionMode.Production) {
        vscode.window.showErrorMessage('An error occured whilst processing theme data:' + error)
      }

      this._state = 'error'
      this.notifyAll()
    }
  }

  private setSessionCache(themeId: string, themeCacheData: ThemeCacheData) {
    this._sessionCache[themeId] = themeCacheData
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

  public getThemeData(): GetThemeData {
    const themeData = this.getFullThemeData() ?? null

    return {
      data: themeData?.themeData ?? null,
      localResourceRoots: themeData?.localResourceRoots ?? [],
      state: this._state,
      themeId: themeData?.themeId ?? null,
    }
  }

  public subscribe(observer: FileThemeProcessorObserver) {
    this._observers.add(observer)
  }

  public unsubscribe(observer: FileThemeProcessorObserver): boolean {
    return this._observers.delete(observer)
  }
}
