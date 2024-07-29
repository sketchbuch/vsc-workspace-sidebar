import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import { RenderIndentGuides, WorkbenchConfig } from '../../../../../config/core'
import {
  CONFIG_WORKBENCH_TREE_EXPAND_MODE,
  CONFIG_WORKBENCH_TREE_INDENT,
  CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES,
} from '../../../../../constants/config'
import * as item from '../../../../../templates/workspace/snippets/itemFile'
import * as itemFolder from '../../../../../templates/workspace/snippets/itemFolder'
import { list, rootPathErrors } from '../../../../../templates/workspace/snippets/list'
import * as rfm from '../../../../../templates/workspace/snippets/rootFolderMessage'
import * as tree from '../../../../../templates/workspace/snippets/tree'
import { OS_HOMEFOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import {
  defaultRootFolderFiles,
  getMockRootFolders,
  getMockState,
} from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: list()', () => {
  let itemSpy: sinon.SinonSpy
  let itemFolderSpy: sinon.SinonSpy
  let osStub: sinon.SinonStub
  let rfMsg: sinon.SinonSpy
  let treeSpy: sinon.SinonSpy

  setup(() => {
    itemSpy = sinon.spy(item, 'itemFile')
    itemFolderSpy = sinon.spy(itemFolder, 'itemFolder')
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
    rfMsg = sinon.spy(rfm, 'rootFolderMessage')
    treeSpy = sinon.spy(tree, 'tree')
  })

  teardown(() => {
    itemSpy.restore()
    itemFolderSpy.restore()
    osStub.restore()
    rfMsg.restore()
    treeSpy.restore()
  })

  test('Renders list if not tree view', () => {
    const mockRootFolders = getMockRootFolders({ showTree: false })
    const mockState = getMockState({ ...mockRootFolders })
    const mockRenderVars = getMockRenderVars({ showTree: false })

    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.called(itemFolderSpy)
    // sinon.assert.callCount(itemSpy, mockState.visibleFileCount)
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
  })

  test('Renders list if tree is null', () => {
    const mockRootFolders = getMockRootFolders({ showTree: false })
    const mockState = getMockState({ ...mockRootFolders })
    const mockRenderVars = getMockRenderVars({ showTree: true })

    const result = list(mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains('<ul class="list__list')
    expect(result).not.contains('list__styled-list--tree')

    sinon.assert.called(itemFolderSpy)
    sinon.assert.called(itemSpy)
    sinon.assert.notCalled(treeSpy)
  })

  rootPathErrors.forEach((res) => {
    test(`Renders rootFolderMessage if rootFolder.result is "${res}"`, () => {
      const mockRootFolders = getMockRootFolders({
        rootFoldersFiles: [{ ...defaultRootFolderFiles[0], result: res }],
        showTree: false,
      })
      const mockState = getMockState({ ...mockRootFolders })
      const mockRenderVars = getMockRenderVars({ showTree: true })

      const result = list(mockState, mockRenderVars)

      expect(result).to.be.a('string')
      sinon.assert.called(rfMsg)
      sinon.assert.called(itemFolderSpy)
      sinon.assert.notCalled(itemSpy)
      sinon.assert.notCalled(treeSpy)
    })
  })

  suite('Indent Guides', () => {
    const initialTreeConfig: WorkbenchConfig = {
      expandMode: CONFIG_WORKBENCH_TREE_EXPAND_MODE,
      indent: CONFIG_WORKBENCH_TREE_INDENT,
      renderIndentGuides: CONFIG_WORKBENCH_TREE_RENDER_INDENT_GUIDES,
    }

    const indentTypes: RenderIndentGuides[] = ['always', 'none', 'onHover']

    const indentTest = (indentType: RenderIndentGuides) => {
      test(`"${indentType}" set in data attribute correctly`, () => {
        const mockRootFolders = getMockRootFolders({ showTree: false })
        const mockState = getMockState({ ...mockRootFolders })
        const mockRenderVars = getMockRenderVars({
          showTree: true,
          treeConfig: { ...initialTreeConfig, renderIndentGuides: indentType },
        })

        const result = list(mockState, mockRenderVars)

        expect(result).to.be.a('string')
        expect(result).contains(`data-indent-guides="${indentType}"`)
      })
    }

    indentTypes.forEach((it) => indentTest(it))
  })
})
