import { expect } from 'chai'
import * as sinon from 'sinon'
import * as sort from '../../../../../templates/helpers/sortTreeChildren'
import * as item from '../../../../../templates/workspace/snippets/itemFile'
import * as folder from '../../../../../templates/workspace/snippets/itemFolder'
import * as trees from '../../../../../templates/workspace/snippets/tree'
import { tree } from '../../../../../templates/workspace/snippets/tree'
import { FileTree } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  FOLDER1,
  FOLDER3,
  FOLDER4,
  ROOT_FOLDER,
  SUBFOLDER1,
  SUBFOLDER2,
  SUBFOLDER3,
  SUBFOLDER4,
  file1,
  file2,
  file3,
  file4,
  getMockFileList,
} from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: tree()', () => {
  let folderSpy: sinon.SinonSpy
  let itemSpy: sinon.SinonSpy
  let sortSpy: sinon.SinonSpy
  let treeSpy: sinon.SinonSpy

  const closedSubTree: FileTree = {
    compactedFolders: [],
    files: [],
    folderPath: '',
    folderPathSegment: FOLDER1,
    isRoot: false,
    label: FOLDER1,
    sub: [],
  }

  const emptyRootTree: FileTree = {
    compactedFolders: [],
    files: [],
    folderPath: '',
    folderPathSegment: ROOT_FOLDER,
    isRoot: true,
    label: ROOT_FOLDER,
    sub: [],
  }

  const emptySubTree: FileTree = {
    compactedFolders: [],
    files: [],
    folderPath: '',
    folderPathSegment: ROOT_FOLDER,
    isRoot: false,
    label: ROOT_FOLDER,
    sub: [],
  }

  setup(() => {
    folderSpy = sinon.spy(folder, 'itemFolder')
    itemSpy = sinon.spy(item, 'itemFile')
    sortSpy = sinon.spy(sort, 'sortTreeChildren')
    treeSpy = sinon.spy(trees, 'tree')
  })

  teardown(() => {
    folderSpy.restore()
    itemSpy.restore()
    sortSpy.restore()
    treeSpy.restore()
  })

  test('An empty unclosed subtree will render nothing', () => {
    const mockRootFolders = getMockRootFolders({ showTree: true })
    const state = getMockState({ ...mockRootFolders })
    const renderVars = getMockRenderVars()

    const result = tree({
      branch: emptySubTree,
      closedFolders: [],
      depth: 0,
      renderVars,
      result: 'ok',
      state,
    })

    expect(result).to.be.a('string')
    expect(result).to.be.empty

    sinon.assert.notCalled(folderSpy)
    sinon.assert.notCalled(itemSpy)
    sinon.assert.calledOnce(sortSpy)
    sinon.assert.calledOnce(treeSpy)
  })

  test('An empty closed subtree will render a folder', () => {
    const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER1], showTree: true })
    const state = getMockState({ ...mockRootFolders })
    const renderVars = getMockRenderVars()

    const result = tree({
      branch: closedSubTree,
      closedFolders: [FOLDER1],
      depth: 0,
      renderVars,
      result: 'no-workspaces',
      state,
    })

    expect(result).to.be.a('string')

    sinon.assert.called(folderSpy)
    sinon.assert.notCalled(itemSpy)
    sinon.assert.notCalled(sortSpy)
    sinon.assert.calledOnce(treeSpy)
  })

  test('An empty root tree will render a folder', () => {
    const mockRootFolders = getMockRootFolders({ showTree: true })
    const state = getMockState({ ...mockRootFolders })
    const renderVars = getMockRenderVars()

    const result = tree({
      branch: emptyRootTree,
      closedFolders: [],
      depth: 0,
      renderVars,
      result: 'no-workspaces',
      state,
    })

    expect(result).to.be.a('string')

    sinon.assert.calledOnce(folderSpy)
    sinon.assert.notCalled(itemSpy)
    sinon.assert.calledOnce(sortSpy)
    sinon.assert.calledOnce(treeSpy)
  })

  test('Children are not sorted if a non-root folder is closed', () => {
    const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER1], showTree: true })
    const state = getMockState({ ...mockRootFolders })
    const renderVars = getMockRenderVars()

    tree({
      branch: closedSubTree,
      closedFolders: [FOLDER1],
      depth: 0,
      renderVars,
      result: 'ok',
      state,
    })

    sinon.assert.notCalled(sortSpy)
  })

  test('All files/folders are rendered', () => {
    const mockRootFolders = getMockRootFolders({ fileTreeType: 'normal', showTree: true })
    const state = getMockState({ ...mockRootFolders })
    const renderVars = getMockRenderVars()

    tree({
      branch: mockRootFolders.rootFolders[0]?.fileTree!,
      closedFolders: [],
      depth: 0,
      renderVars,
      result: 'ok',
      state,
    })

    sinon.assert.callCount(itemSpy, getMockFileList().length)
    // Order like this due to child sorting
    expect(itemSpy.args[0][0].file.label).to.equal(file1.label)
    expect(itemSpy.args[1][0].file.label).to.equal(file2.label)
    expect(itemSpy.args[2][0].file.label).to.equal(file3.label)
    expect(itemSpy.args[3][0].file.label).to.equal(file4.label)

    sinon.assert.callCount(folderSpy, 8)
    expect(folderSpy.args[0][0].folder.label).to.equal(ROOT_FOLDER)
    expect(folderSpy.args[1][0].folder.label).to.equal(FOLDER1)
    expect(folderSpy.args[2][0].folder.label).to.equal(SUBFOLDER1)
    expect(folderSpy.args[3][0].folder.label).to.equal(SUBFOLDER2)
    expect(folderSpy.args[4][0].folder.label).to.equal(FOLDER3)
    expect(folderSpy.args[5][0].folder.label).to.equal(SUBFOLDER3)
    expect(folderSpy.args[6][0].folder.label).to.equal(FOLDER4)
    expect(folderSpy.args[7][0].folder.label).to.equal(SUBFOLDER4)
  })
})
