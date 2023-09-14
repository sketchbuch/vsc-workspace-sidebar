import { expect } from 'chai'
import * as sinon from 'sinon'
import { ExtensionContext } from 'vscode'
import { ThemeProcessor } from '../../../theme/ThemeProcessor'
// import { ThemeCacheData } from '../../../theme/ThemeProcessor.interface'
import { getMockContext } from './mocks/mockContext'

suite('Theme > ThemeProcessor()', () => {
  /* const themeCacheData: ThemeCacheData = {
    themeData: {
      iconDefinitions: {},
      fileExtensions: {},
      fileNames: {},
      languageIds: {},
      fonts: [],
    },
    themeId: 'vs-seti',
    timestamp: Math.floor(Date.now() / 1000),
  } */

  let mockContext: ExtensionContext
  let getStore: sinon.SinonSpy
  let themeProcessor: ThemeProcessor
  let updateStore: sinon.SinonSpy

  setup(() => {
    mockContext = getMockContext()
    getStore = sinon.spy(mockContext.globalState, 'get')
    themeProcessor = new ThemeProcessor(mockContext)
    updateStore = sinon.spy(mockContext.globalState, 'update')
  })

  teardown(() => {
    getStore.restore()
    updateStore.restore()
  })

  test('getThemeData() returns null if there is no data', () => {
    const data = themeProcessor.getThemeData()
    expect(data).to.be.null
  })

  // Set data on thecache directly and test what getthemedata returns
})
