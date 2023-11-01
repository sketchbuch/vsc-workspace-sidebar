import { expect } from 'chai'
import * as sinon from 'sinon'
import { list } from '../../../../../templates/workspace/snippets/list'
import * as item from '../../../../../templates/workspace/snippets/listItem'
import * as tree from '../../../../../templates/workspace/snippets/tree'
import { SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite.only('Templates > Workspace > Snippets: list()', () => {
  const mockState = getMockState()
  const mockRenderVars = getMockRenderVars()
  let itemSpy: sinon.SinonSpy
  let treeSpy: sinon.SinonSpy

  setup(() => {
    itemSpy = sinon.spy(item, 'listItem')
    treeSpy = sinon.spy(tree, 'tree')
  })

  teardown(() => {
    itemSpy.restore()
    treeSpy.restore()
  })

  test('Renders nothing if there are no files', () => {
    const result = list(getMockState({ fileCount: 0 }), mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })

  test('Renders search-out message if no visibleFiles and search is in progress', () => {
    const result = list(
      getMockState({
        search: getMockSearchState({ term: SEARCH_TERM }),
        visibleFileCount: 0,
      }),
      mockRenderVars
    )

    expect(result).to.be.a('string')
    expect(result).contains('<div class="list__searchedout">')
    expect(result).contains('No workspaces matched your search terms')
  })

  test.only('Renders list if not tree view', () => {
    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.callCount(itemSpy, mockState.visibleFiles.length)
    sinon.assert.notCalled(treeSpy)
  })

  /* 

  test('Renders list if not tree view', () => {
    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.callCount(itemSpy, mockState.visibleFiles.length)
    sinon.assert.notCalled(treeSpy)
  })

  test('Renders tree if tree view', () => {
    const result = list(mockState, getMockRenderVars({ showTree: true }))

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).contains('list__styled-list--tree')

    sinon.assert.called(treeSpy)
    sinon.assert.notCalled(itemSpy)
  })

  test('Renders list if tree is null', () => {
    const result = list(
      { ...mockState  fileTree: null  },
      getMockRenderVars({ showTree: true })
    )

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.called(itemSpy)
    sinon.assert.notCalled(treeSpy)
  }) */
})
