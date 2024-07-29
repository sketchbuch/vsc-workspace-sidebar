import { expect } from 'chai'
import { listContent } from '../../../../../templates/workspace/snippets/listContent'
import { SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: listContent()', () => {
  const mockState = getMockState()
  const mockRenderVars = getMockRenderVars()
  const mockRootFolder = getMockRootFolders().rootFolders[0]

  setup(() => {})

  teardown(() => {})

  test('Renders correct content for a root path error', () => {
    const result = listContent({
      isClosed: false,
      isRootPathError: true,
      renderVars: mockRenderVars,
      rootFolder: mockRootFolder,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('rootfolder__message')
  })

  test('Renders correct content for a loading folder', () => {
    const result = listContent({
      isClosed: false,
      isRootPathError: false,
      renderVars: mockRenderVars,
      rootFolder: { ...mockRootFolder, result: 'loading' },
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('rootfolder__message')
    expect(result).contains('data-type="loading"')
  })

  test('Renders correct content for an empty search', () => {
    const result = listContent({
      isClosed: false,
      isRootPathError: false,
      renderVars: mockRenderVars,
      rootFolder: { ...mockRootFolder, visibleFiles: [] },
      state: {
        ...mockState,
        search: getMockSearchState({ term: SEARCH_TERM }),
      },
    })

    expect(result).to.be.a('string')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('rootfolder__message')
    expect(result).contains('data-type="searched-out"')
  })

  test('Renders correct content for a file tree', () => {
    const result = listContent({
      isClosed: false,
      isRootPathError: false,
      renderVars: mockRenderVars,
      rootFolder: getMockRootFolders({ showTree: true }).rootFolders[0],
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__branch-list-item')
  })

  test('Renders correct content for a list', () => {
    const result = listContent({
      isClosed: false,
      isRootPathError: false,
      renderVars: mockRenderVars,
      rootFolder: getMockRootFolders({ showTree: false }).rootFolders[0],
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__styled-item')
  })
})
