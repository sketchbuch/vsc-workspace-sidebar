import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import * as item from '../../../../../templates/workspace/snippets/itemFile'
import { list } from '../../../../../templates/workspace/snippets/list'
import * as rfm from '../../../../../templates/workspace/snippets/rootFolderMessage'
import * as tree from '../../../../../templates/workspace/snippets/tree'
import { OS_HOMEFOLDER, SEARCH_TERM } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockSearchState, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: list()', () => {
  let itemSpy: sinon.SinonSpy
  let osStub: sinon.SinonSpy
  let rfMsg: sinon.SinonSpy
  let treeSpy: sinon.SinonSpy

  setup(() => {
    itemSpy = sinon.spy(item, 'itemFile')
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
    rfMsg = sinon.spy(rfm, 'rootFolderMessage')
    treeSpy = sinon.spy(tree, 'tree')
  })

  teardown(() => {
    itemSpy.restore()
    osStub.restore()
    rfMsg.restore()
    treeSpy.restore()
  })

  test('Renders nothing if there are no files', () => {
    const result = list(getMockState({ fileCount: 0 }), getMockRenderVars())

    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })

  test('Renders search-out message if no visibleFiles and search is in progress', () => {
    const result = list(
      getMockState({
        fileCount: 1,
        search: getMockSearchState({ term: SEARCH_TERM }),
        visibleFileCount: 0,
      }),
      getMockRenderVars()
    )

    expect(result).to.be.a('string')
    expect(result).contains('<div class="list__searchedout">')
    expect(result).contains('No workspaces matched your search terms')
  })

  test('Renders list if not tree view', () => {
    const mockRootFolders = getMockRootFolders({ showTree: false })
    const mockState = getMockState({ ...mockRootFolders })
    const mockRenderVars = getMockRenderVars({ showTree: false })

    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.callCount(itemSpy, mockState.visibleFileCount)
    sinon.assert.notCalled(treeSpy)
  })

  test('Renders tree if tree view', () => {
    const mockRootFolders = getMockRootFolders({ showTree: true })
    const mockState = getMockState({ ...mockRootFolders })
    const mockRenderVars = getMockRenderVars({ showTree: true })

    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).contains('list__styled-list--tree')

    sinon.assert.called(treeSpy)
    sinon.assert.notCalled(itemSpy)
  })

  test('Renders list if tree is null', () => {
    const mockRootFolders = getMockRootFolders({ showTree: false })
    const mockState = getMockState({ ...mockRootFolders })
    const mockRenderVars = getMockRenderVars({ showTree: true })

    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.called(itemSpy)
    sinon.assert.notCalled(treeSpy)
  })
})
