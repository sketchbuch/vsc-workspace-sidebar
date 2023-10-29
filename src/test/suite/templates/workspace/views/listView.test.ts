import { expect } from 'chai'
import * as sinon from 'sinon'
import * as settings from '../../../../../templates/common/snippets/settingsLink'
import * as folder from '../../../../../templates/workspace/snippets/folderList'
import * as notification from '../../../../../templates/workspace/snippets/hoverNotification'
import * as list from '../../../../../templates/workspace/snippets/list'
import * as search from '../../../../../templates/workspace/snippets/searchForm'
import { listView } from '../../../../../templates/workspace/views/listView'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > View: listView()', () => {
  let folderSpy: sinon.SinonSpy
  let listSpy: sinon.SinonSpy
  let notficationSpy: sinon.SinonSpy
  let searchSpy: sinon.SinonSpy
  let settingsSpy: sinon.SinonSpy

  const mockRenderVars = getMockRenderVars({ themeProcessorState: 'ready' })
  const mockRootFolders = getMockRootFolders()

  setup(() => {
    folderSpy = sinon.spy(folder, 'folderList')
    listSpy = sinon.spy(list, 'list')
    notficationSpy = sinon.spy(notification, 'hoverNotification')
    searchSpy = sinon.spy(search, 'searchForm')
    settingsSpy = sinon.spy(settings, 'settingsLink')
  })

  teardown(() => {
    folderSpy.restore()
    listSpy.restore()
    notficationSpy.restore()
    searchSpy.restore()
    settingsSpy.restore()
  })

  test('Renders correctly if there are no files', () => {
    const mockState = getMockState()
    const result = listView(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).not.to.equal('')
    expect(result).contains('class="view list list--empty"')

    sinon.assert.callCount(settingsSpy, 1)
  })

  test('Renders correctly if there are files', () => {
    const mockState = getMockState({ ...mockRootFolders })
    const result = listView(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).not.to.equal('')
    expect(result).contains('class="view list"')

    sinon.assert.callCount(listSpy, 1)
    sinon.assert.calledWith(listSpy, mockState, mockRenderVars)
    sinon.assert.callCount(folderSpy, 1)
    sinon.assert.callCount(searchSpy, 1)
  })

  suite('Hover Notification:', () => {
    const mockState = getMockState({ ...mockRootFolders })

    test('Shows if theme is loading', () => {
      listView(mockState, getMockRenderVars({ themeProcessorState: 'loading' }))

      sinon.assert.callCount(notficationSpy, 1)
    })

    test('Not shown if theme is error', () => {
      listView(mockState, getMockRenderVars({ themeProcessorState: 'error' }))
      sinon.assert.notCalled(notficationSpy)
    })

    test('Not shown if theme is idle', () => {
      listView(mockState, getMockRenderVars({ themeProcessorState: 'idle' }))
      sinon.assert.notCalled(notficationSpy)
    })

    test('Not shown if theme is ready', () => {
      listView(mockState, getMockRenderVars({ themeProcessorState: 'ready' }))
      sinon.assert.notCalled(notficationSpy)
    })
  })

  suite('Search Form:', () => {
    test('Shows if searchMinimum is 0', () => {
      const mockRenderVars = getMockRenderVars({ searchMinimum: 0 })
      const mockState = getMockState({ ...mockRootFolders })
      listView(mockState, mockRenderVars)

      sinon.assert.callCount(searchSpy, 1)
      sinon.assert.calledWith(searchSpy, mockState, true)
    })

    test('Shows if fileCount is greater than searchMinimum', () => {
      const mockRenderVars = getMockRenderVars({ searchMinimum: 2 })
      const mockState = getMockState({ ...mockRootFolders, fileCount: 3 })
      listView(mockState, mockRenderVars)

      sinon.assert.callCount(searchSpy, 1)
      sinon.assert.calledWith(searchSpy, mockState, true)
    })

    test('Not shown if fileCount is less than searchMinimum', () => {
      const mockRenderVars = getMockRenderVars({ searchMinimum: 20 })
      const mockState = getMockState({ ...mockRootFolders, fileCount: 10 })
      listView(mockState, mockRenderVars)

      sinon.assert.callCount(searchSpy, 1)
      sinon.assert.calledWith(searchSpy, mockState, false)
    })
  })
})
