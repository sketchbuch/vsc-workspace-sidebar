import { expect } from 'chai'
import * as sinon from 'sinon'
import * as links from '../../../../../templates/common/snippets/viewLink'
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
  let vlSpy: sinon.SinonSpy

  const mockRenderVars = getMockRenderVars({ themeProcessorState: 'ready' })
  const mockRootFolders = getMockRootFolders()

  setup(() => {
    folderSpy = sinon.spy(folder, 'folderList')
    listSpy = sinon.spy(list, 'list')
    notficationSpy = sinon.spy(notification, 'hoverNotification')
    searchSpy = sinon.spy(search, 'searchForm')
    vlSpy = sinon.spy(links, 'viewLink')
  })

  teardown(() => {
    folderSpy.restore()
    listSpy.restore()
    notficationSpy.restore()
    searchSpy.restore()
    vlSpy.restore()
  })

  test('Renders correctly', () => {
    const mockState = getMockState({ ...mockRootFolders })
    const result = listView(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('class="view list"')

    sinon.assert.callCount(listSpy, 1)
    sinon.assert.calledWith(listSpy, mockState, mockRenderVars)
    sinon.assert.callCount(folderSpy, 1)
    sinon.assert.callCount(searchSpy, 1)
  })

  suite('Section attributes:', () => {
    const mockState = getMockState({ ...mockRootFolders })

    test('Renders data-extws="true" if isExternalWs is true', () => {
      const result = listView(mockState, getMockRenderVars({ isExternalWs: true }))
      expect(result).contains('data-extws="true"')
    })

    test('Renders data-extws="false" if isExternalWs is false', () => {
      const result = listView(mockState, getMockRenderVars({ isExternalWs: false }))
      expect(result).contains('data-extws="false"')
    })

    test('Renders data-fileiconsactive="true" if fileIconsActive is true', () => {
      const result = listView(mockState, getMockRenderVars({ fileIconsActive: true }))
      expect(result).contains('data-fileiconsactive="true"')
    })

    test('Renders data-fileiconsactive="false" if fileIconsActive is false', () => {
      const result = listView(mockState, getMockRenderVars({ fileIconsActive: false }))
      expect(result).contains('data-fileiconsactive="false"')
    })

    test('Renders data-folderopen="true" if wsType is folder', () => {
      const result = listView(
        getMockState({ ...mockRootFolders, wsType: 'folder' }),
        mockRenderVars
      )

      expect(result).contains('data-folderopen="true"')
    })

    test('Renders data-folderopen="false" if wsType is none', () => {
      const result = listView(getMockState({ ...mockRootFolders, wsType: 'none' }), mockRenderVars)
      expect(result).contains('data-folderopen="false"')
    })

    test('Renders data-folderopen="false" if wsType is ws', () => {
      const result = listView(getMockState({ ...mockRootFolders, wsType: 'ws' }), mockRenderVars)
      expect(result).contains('data-folderopen="false"')
    })
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
})
