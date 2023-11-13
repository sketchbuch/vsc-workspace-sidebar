import { expect } from 'chai'
import os from 'os'
import * as path from 'path'
import * as sinon from 'sinon'
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons'
import * as selected from '../../../../../templates/workspace/snippets/listItemIcon'
import * as icons from '../../../../../templates/workspace/snippets/treeIcons'
import * as indent from '../../../../../templates/workspace/snippets/treeIndent'
import { treeItemFolder } from '../../../../../templates/workspace/snippets/treeItemFolder'
import { FileTree } from '../../../../../webviews/Workspace/helpers/getFileTree'
import { OS_HOMEFOLDER, ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: treeItemFolder()', () => {
  const DEPTH = 0
  const FOLDER_PATH = 'supernatural/winchester'
  const folder: FileTree = {
    files: [],
    folderPath: `${OS_HOMEFOLDER}/${FOLDER_PATH}`,
    folderPathSegment: FOLDER_PATH,
    isRoot: true,
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
    btnSpy = sinon.spy(buttons, 'listItemButtons')
    iconClosedSpy = sinon.spy(icons, 'treeIconClosed')
    iconOpenSpy = sinon.spy(icons, 'treeIconOpen')
    indentSpy = sinon.spy(indent, 'treeIndent')
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
    selectedIconSpy = sinon.spy(selected, 'listItemIcon')
  })

  teardown(() => {
    btnSpy.restore()
    iconClosedSpy.restore()
    iconOpenSpy.restore()
    indentSpy.restore()
    osStub.restore()
    selectedIconSpy.restore()
  })

  test('Renders correctly', () => {
    const result = treeItemFolder(folder, DEPTH, false, mockState, mockRenderVars)

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`title="~/${FOLDER_PATH}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__title">${folder.label}</span>`)

    sinon.assert.callCount(btnSpy, 1)
    sinon.assert.calledWith(btnSpy, [
      {
        ariaLabel: `Open folder containing '${folder.label}' in your file manager`,
        codicon: 'browser',
        file: folder.folderPath,
        renderVars: mockRenderVars,
        tooltip: `Open '${folder.label}' in your file manager`,
        type: 'open-filemanager',
      },
    ])
    sinon.assert.calledOnce(indentSpy)
  })

  suite('Closable class:', () => {
    test('Root folders do not have closable class', () => {
      const result = treeItemFolder(
        { ...folder, isRoot: true },
        DEPTH,
        false,
        mockState,
        mockRenderVars
      )

      expect(result).not.contains(`list__branch-list-item-folder-closable`)
    })

    test('Non-root folders have closable class', () => {
      const result = treeItemFolder(
        { ...folder, isRoot: false },
        DEPTH,
        false,
        mockState,
        mockRenderVars
      )

      expect(result).contains(`list__branch-list-item-folder-closable`)
    })
  })

  suite('Close/open icons:', () => {
    test('Closed icon shown if closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      treeItemFolder(folder, DEPTH, true, mockState, mockRenderVars)

      sinon.assert.calledOnce(iconClosedSpy)
      sinon.assert.notCalled(iconOpenSpy)
    })

    test('Open icon shown if not closed', () => {
      treeItemFolder(folder, DEPTH, false, mockState, mockRenderVars)

      sinon.assert.notCalled(iconClosedSpy)
      sinon.assert.calledOnce(iconOpenSpy)
    })
  })

  suite('Selected indicator:', () => {
    test('Not shown if not selected', () => {
      const result = treeItemFolder(folder, DEPTH, false, mockState, mockRenderVars)

      expect(result).to.be.a('string')
      expect(result).not.contains(`list__styled-item--selected`)

      sinon.assert.notCalled(selectedIconSpy)
    })

    test('Shown if selected & closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })
      const result = treeItemFolder(
        folder,
        DEPTH,
        true,
        {
          ...mockState,
          selected: `${FOLDER_PATH}${path.sep}`,
        },
        mockRenderVars
      )

      expect(result).to.be.a('string')
      expect(result).contains(`list__styled-item--selected`)

      sinon.assert.calledOnce(selectedIconSpy)
    })
  })
})
