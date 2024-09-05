import sinon from 'sinon'
import { updateByType } from '../../../../../webviews/Workspace/helpers/updateByType'
import { WorkspaceViewProvider } from '../../../../../webviews/Workspace/WorkspaceViewProvider'
import { getMockContext } from '../../../../mocks/mockContext'
import { mockThemeDataProvider } from '../../../../mocks/mockThemeDataProvider'

suite('Webviews > Workspace > Helpers > updateByType():', () => {
  let refreshSpy: sinon.SinonSpy
  let searchSpy: sinon.SinonSpy
  let updateTreeSpy: sinon.SinonSpy
  let visFilesSpy: sinon.SinonSpy

  let ws: WorkspaceViewProvider

  setup(() => {
    ws = new WorkspaceViewProvider(getMockContext(), mockThemeDataProvider)

    refreshSpy = sinon.spy(ws, 'refresh')
    searchSpy = sinon.spy(ws, 'updateSearch')
    updateTreeSpy = sinon.spy(ws, 'updateFileTree')
    visFilesSpy = sinon.spy(ws, 'updateVisibleFiles')
  })

  teardown(() => {
    refreshSpy.restore()
    searchSpy.restore()
    updateTreeSpy.restore()
    visFilesSpy.restore()
  })

  test('"search" calls updateSearch()', () => {
    updateByType('search', ws, false)

    sinon.assert.notCalled(refreshSpy)
    sinon.assert.callCount(searchSpy, 1)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"visible-files" calls updateVisibleFiles()', () => {
    updateByType('visible-files', ws, false)

    sinon.assert.notCalled(refreshSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.callCount(visFilesSpy, 1)
  })

  test('"tree" calls updateFileTree() if isTree is true', () => {
    updateByType('tree', ws, true)

    sinon.assert.notCalled(refreshSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.callCount(updateTreeSpy, 1)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"tree" does not call updateFileTree() if isTree is false', () => {
    updateByType('tree', ws, false)

    sinon.assert.notCalled(refreshSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"refresh" calls refresh() to refresh', () => {
    updateByType('refresh', ws, false)

    sinon.assert.callCount(refreshSpy, 1)
    sinon.assert.calledWith(refreshSpy, false)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"rerender" calls refresh() to rerender', () => {
    updateByType('rerender', ws, false)

    sinon.assert.callCount(refreshSpy, 1)
    sinon.assert.calledWith(refreshSpy, true)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })
})
