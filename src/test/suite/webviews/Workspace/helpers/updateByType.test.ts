import sinon from 'sinon'
import { updateByType } from '../../../../../webviews/Workspace/helpers/updateByType'
import { WorkspaceViewProvider } from '../../../../../webviews/Workspace/WorkspaceViewProvider'
import { getMockContext } from '../../../../mocks/mockContext'
import { mockThemeDataProvider } from '../../../../mocks/mockThemeDataProvider'

suite('Webviews > Workspace > Helpers > updateByType():', () => {
  let refetchSpy: sinon.SinonSpy
  let rerenderSpy: sinon.SinonSpy
  let searchSpy: sinon.SinonSpy
  let updateTreeSpy: sinon.SinonSpy
  let visFilesSpy: sinon.SinonSpy

  let ws: WorkspaceViewProvider

  setup(() => {
    ws = new WorkspaceViewProvider(getMockContext(), mockThemeDataProvider)

    refetchSpy = sinon.spy(ws, 'refetch')
    rerenderSpy = sinon.spy(ws, 'rerender')
    searchSpy = sinon.spy(ws, 'updateSearch')
    updateTreeSpy = sinon.spy(ws, 'updateFileTree')
    visFilesSpy = sinon.spy(ws, 'updateVisibleFiles')
  })

  teardown(() => {
    refetchSpy.restore()
    rerenderSpy.restore()
    searchSpy.restore()
    updateTreeSpy.restore()
    visFilesSpy.restore()
  })

  test('"search" calls updateSearch()', () => {
    updateByType('search', ws, false)

    sinon.assert.callCount(searchSpy, 1)
    sinon.assert.notCalled(refetchSpy)
    sinon.assert.notCalled(rerenderSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"visible-files" calls updateVisibleFiles()', () => {
    updateByType('visible-files', ws, false)

    sinon.assert.callCount(visFilesSpy, 1)
    sinon.assert.notCalled(refetchSpy)
    sinon.assert.notCalled(rerenderSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
  })

  test('"tree" calls updateFileTree() if isTree is true', () => {
    updateByType('tree', ws, true)

    sinon.assert.callCount(updateTreeSpy, 1)
    sinon.assert.notCalled(refetchSpy)
    sinon.assert.notCalled(rerenderSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"tree" does not call updateFileTree() if isTree is false', () => {
    updateByType('tree', ws, false)

    sinon.assert.notCalled(refetchSpy)
    sinon.assert.notCalled(rerenderSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"refetch" calls refetch()', () => {
    updateByType('refetch', ws, false)

    sinon.assert.callCount(refetchSpy, 1)
    sinon.assert.notCalled(rerenderSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })

  test('"rerender" calls rerender()', () => {
    updateByType('rerender', ws, false)

    sinon.assert.callCount(rerenderSpy, 1)
    sinon.assert.notCalled(refetchSpy)
    sinon.assert.notCalled(searchSpy)
    sinon.assert.notCalled(updateTreeSpy)
    sinon.assert.notCalled(visFilesSpy)
  })
})
