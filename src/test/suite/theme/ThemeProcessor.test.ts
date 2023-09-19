import { expect } from 'chai'
import * as sinon from 'sinon'
import { ExtensionContext } from 'vscode'
import { DEFAULT_THEME } from '../../../theme/constants'
import { ThemeProcessor } from '../../../themeNpm/ThemeProcessor'
import { ThemeCacheData, ThemeProcessorObserver } from '../../../themeNpm/ThemeProcessor.interface'
import { getMockContext } from './mocks/mockContext'

suite('Theme > ThemeProcessor()', () => {
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

  test('getThemeData() returns expected theme data if there is no data', () => {
    const data = themeProcessor.getThemeData()
    expect(data).to.eql({
      data: null,
      localResourceRoots: [],
      state: 'loading',
      themeId: null,
    })
  })

  test('getThemeData() returns expected theme data if there is data', async () => {
    const mockData: ThemeCacheData = {
      localResourceRoots: ['some/path/to/serve/from'],
      themeData: {
        fonts: [],
        iconDefinitions: {
          typescript: {
            fontId: DEFAULT_THEME,
            fontSize: '120%',
          },
        },
      },
      themeId: DEFAULT_THEME,
      timestamp: 1695041763,
    }

    await mockContext.globalState.update('themeProcessor-cache', mockData)
    const data = themeProcessor.getThemeData()

    expect(data).to.eql({
      data: mockData.themeData,
      localResourceRoots: mockData.localResourceRoots,
      state: 'loading',
      themeId: mockData.themeId,
    })
  })

  test('subscribe && unsubscribe work as expected', () => {
    const observer = { notify: () => null } as ThemeProcessorObserver

    expect(themeProcessor.unsubscribe(observer)).to.be.false
    themeProcessor.subscribe(observer)
    expect(themeProcessor.unsubscribe(observer)).to.be.true
  })
})
