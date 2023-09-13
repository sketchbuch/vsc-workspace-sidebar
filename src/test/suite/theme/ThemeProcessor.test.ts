import { expect } from 'chai'
import * as sinon from 'sinon'
import { ExtensionContext } from 'vscode'
import { ThemeProcessor } from '../../../theme/ThemeProcessor'
import { ThemeCacheData } from '../../../theme/ThemeProcessor.interface'
import { getMockContext } from './mocks/mockContext'

suite('Theme > ThemeProcessor()', () => {
  const themeCacheData: ThemeCacheData = {
    themeData: {
      iconDefinitions: {},
      fileExtensions: {},
      fileNames: {},
      languageIds: {},
      fonts: [],
    },
    themeId: 'vs-seti',
    timestamp: Math.floor(Date.now() / 1000),
  }

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

  test('setThemeData() sets the data', async () => {
    await themeProcessor.setThemeData(themeCacheData)

    sinon.assert.called(updateStore)
    sinon.assert.calledWith(updateStore, 'themeProcessor-cache', themeCacheData)
  })

  test('getThemeData() returns null if there is no data', () => {
    const data = themeProcessor.getThemeData()
    expect(data).to.be.null
  })

  test('getThemeData() returns the data if there is data set', async () => {
    await themeProcessor.setThemeData(themeCacheData)
    const data = themeProcessor.getThemeData()

    sinon.assert.called(getStore)
    expect(data).to.equal(themeCacheData.themeData)
  })

  test('deleteThemeData() deletes the data', async () => {
    await themeProcessor.setThemeData(themeCacheData)
    const data = themeProcessor.getThemeData()

    sinon.assert.called(getStore)
    expect(data).to.equal(themeCacheData.themeData)

    await themeProcessor.deleteThemeData()
    sinon.assert.called(updateStore)
    sinon.assert.calledWith(updateStore, 'themeProcessor-cache', undefined)

    const deletedData = themeProcessor.getThemeData()
    expect(deletedData).to.be.null
  })
})
