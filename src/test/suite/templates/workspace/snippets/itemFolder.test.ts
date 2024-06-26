import { expect } from 'chai'
import os from 'os'
import * as path from 'path'
import * as sinon from 'sinon'
import * as buttons from '../../../../../templates/workspace/snippets/itemButtons'
import { itemFolder } from '../../../../../templates/workspace/snippets/itemFolder'
import * as icons from '../../../../../templates/workspace/snippets/itemIcons'
import * as indent from '../../../../../templates/workspace/snippets/itemIndent'
import { FileTree } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { OS_HOMEFOLDER, ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: itemFolder()', () => {
  const DEPTH = 0
  const FOLDER_PATH = 'supernatural/winchester'
  const folder: FileTree = {
    compactedFolders: [],
    files: [],
    folderPath: `${OS_HOMEFOLDER}/${FOLDER_PATH}`,
    folderPathSegment: FOLDER_PATH,
    isRoot: false,
    label: ROOT_FOLDER,
    sub: [],
  }
  const mockRootFolders = getMockRootFolders({ showTree: true })
  const mockState = getMockState({ ...mockRootFolders })
  const mockRenderVars = getMockRenderVars()

  let btnSpy: sinon.SinonSpy
  let iconClosedSpy: sinon.SinonSpy
  let iconOpenSpy: sinon.SinonSpy
  let indentSpy: sinon.SinonSpy
  let osStub: sinon.SinonStub
  let selectedIconSpy: sinon.SinonSpy

  setup(() => {
    btnSpy = sinon.spy(buttons, 'itemButtons')
    iconClosedSpy = sinon.spy(icons, 'itemIconClosed')
    iconOpenSpy = sinon.spy(icons, 'itemIconOpen')
    indentSpy = sinon.spy(indent, 'itemIndent')
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
    selectedIconSpy = sinon.spy(icons, 'itemIconSelected')
  })

  teardown(() => {
    btnSpy.restore()
    iconClosedSpy.restore()
    iconOpenSpy.restore()
    indentSpy.restore()
    osStub.restore()
    selectedIconSpy.restore()
  })

  test('Renders non-root folder correctly', () => {
    const result = itemFolder({
      depth: DEPTH,
      folder,
      isClosed: false,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`title="~/${FOLDER_PATH}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__title">${folder.label}</span>`)
    expect(result).contains('list__branch-list-item')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__styled-item')
    expect(result).contains('list__branch-list-item-folder--closable')

    sinon.assert.callCount(btnSpy, 1)
    sinon.assert.calledWith(btnSpy, [
      {
        ariaLabel: `Open folder containing '${folder.label}' in your file manager`,
        codicon: 'browser',
        file: folder.folderPath,
        renderVars: mockRenderVars,
        tooltip: `Open folder containing '${folder.label}' in your file manager`,
        type: 'open-filemanager',
      },
    ])
    sinon.assert.calledOnce(indentSpy)
  })

  test('Renders non-root folder correctly if isFolderError is "true"', () => {
    const result = itemFolder({
      depth: DEPTH,
      folder,
      isClosed: false,
      isFolderError: true,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`title="~/${FOLDER_PATH}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__title">${folder.label}</span>`)
    expect(result).contains('list__branch-list-item')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__styled-item')
    expect(result).contains('list__branch-list-item-folder--closable')

    sinon.assert.notCalled(btnSpy)
    sinon.assert.notCalled(iconClosedSpy)
    sinon.assert.notCalled(selectedIconSpy)
    sinon.assert.notCalled(iconClosedSpy)
    sinon.assert.calledOnce(iconOpenSpy)
    sinon.assert.calledOnce(indentSpy)
  })

  test('Renders root folder correctly when labels should be cleaned', () => {
    const cleanedLabel = 'Dev'
    const result = itemFolder({
      depth: DEPTH,
      folder: { ...folder, isRoot: true },
      isClosed: false,
      renderVars: { ...mockRenderVars, cleanLabels: true },
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`title="~/${FOLDER_PATH}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__title">${cleanedLabel}</span>`)
    expect(result).contains('list__branch-list-item')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__styled-item')
    expect(result).contains('list__branch-list-item-folder--closable')

    sinon.assert.callCount(btnSpy, 1)
    sinon.assert.calledWith(btnSpy, [
      {
        ariaLabel: `Open folder containing '${cleanedLabel}' in your file manager`,
        codicon: 'browser',
        file: folder.folderPath,
        renderVars: mockRenderVars,
        tooltip: `Open folder containing '${cleanedLabel}' in your file manager`,
        type: 'open-filemanager',
      },
    ])
    sinon.assert.calledOnce(indentSpy)
  })

  test('Renders root folder correctly when labels should not be cleaned', () => {
    const result = itemFolder({
      depth: DEPTH,
      folder: { ...folder, isRoot: true },
      isClosed: false,
      renderVars: { ...mockRenderVars, cleanLabels: false },
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`title="~/${FOLDER_PATH}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__title">${folder.label}</span>`)
    expect(result).contains('list__branch-list-item')
    expect(result).contains('list__branch-list-item-folder')
    expect(result).contains('list__styled-item')
    expect(result).contains('list__branch-list-item-folder--closable')

    sinon.assert.callCount(btnSpy, 1)
    sinon.assert.calledWith(btnSpy, [
      {
        ariaLabel: `Open folder containing '${folder.label}' in your file manager`,
        codicon: 'browser',
        file: folder.folderPath,
        renderVars: { ...mockRenderVars, cleanLabels: false },
        tooltip: `Open folder containing '${folder.label}' in your file manager`,
        type: 'open-filemanager',
      },
    ])
    sinon.assert.calledOnce(indentSpy)
  })

  test('Root folders have root class', () => {
    const result = itemFolder({
      depth: DEPTH,
      folder: { ...folder, isRoot: true },
      isClosed: false,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).contains(`list__branch-list-item-folder--root`)
  })

  suite('Indent:', () => {
    test('Does not render indent if depth 0', () => {
      const mockRootFolders = getMockRootFolders({ showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      const result = itemFolder({
        depth: 0,
        folder,
        isClosed: true,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).not.contains(`list_branch-indent-box`)
      expect(result).not.contains(`list_branch-indent`)
    })

    test('Renders indent if depth >= 1', () => {
      const mockRootFolders = getMockRootFolders({ showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      const result = itemFolder({
        depth: 1,
        folder,
        isClosed: true,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).contains(`list_branch-indent-box`)
    })
  })

  suite('Close/open icons:', () => {
    test('Closed icon shown if closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      const result = itemFolder({
        depth: DEPTH,
        folder,
        isClosable: true,
        isClosed: true,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).contains(`list__branch-list-item-folder--closable`)

      sinon.assert.calledOnce(iconClosedSpy)
      sinon.assert.notCalled(iconOpenSpy)
    })

    test('Open icon shown if not closed', () => {
      const result = itemFolder({
        depth: DEPTH,
        folder,
        isClosable: true,
        isClosed: false,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).contains(`list__branch-list-item-folder--closable`)

      sinon.assert.notCalled(iconClosedSpy)
      sinon.assert.calledOnce(iconOpenSpy)
    })

    test('Closable class not rendered if not closable', () => {
      const result = itemFolder({
        depth: DEPTH,
        folder,
        isClosable: false,
        isClosed: false,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).not.contains(`list__branch-list-item-folder--closable`)
    })
  })

  suite('Selected indicator:', () => {
    test('Not shown if not selected', () => {
      const result = itemFolder({
        depth: DEPTH,
        folder,
        isClosed: false,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).to.be.a('string')
      expect(result).not.contains(`list__styled-item--selected`)

      sinon.assert.notCalled(selectedIconSpy)
    })

    test('Shown if selected & closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })
      const result = itemFolder({
        depth: DEPTH,
        folder,
        isClosed: true,
        renderVars: mockRenderVars,
        state: {
          ...mockState,
          selected: path.join(folder.folderPath, 'Impala.code-workspace'),
        },
      })

      expect(result).to.be.a('string')
      expect(result).contains(`list__styled-item--selected`)

      sinon.assert.calledOnce(selectedIconSpy)
    })
  })

  suite('iscompacted:', () => {
    test('Uncompacted folder has false data attribute', () => {
      const result = itemFolder({
        depth: DEPTH,
        folder: { ...folder, compactedFolders: [] },
        isClosed: false,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).to.be.a('string')
      expect(result).contains(`data-iscompacted="false"`)
    })

    test('Compacted folder has true data attribute', () => {
      const result = itemFolder({
        depth: DEPTH,
        folder: {
          ...folder,
          compactedFolders: [{ folderPath: '', folderPathSegment: '', label: '' }],
        },
        isClosed: false,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).to.be.a('string')
      expect(result).contains(`data-iscompacted="true"`)
    })
  })
})
