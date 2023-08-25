import { expect } from 'chai'
import path from 'path'
import * as sinon from 'sinon'
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons'
import * as selected from '../../../../../templates/workspace/snippets/listItemIcon'
import * as icons from '../../../../../templates/workspace/snippets/treeIcons'
import * as indent from '../../../../../templates/workspace/snippets/treeIndent'
import { treeItemFolder } from '../../../../../templates/workspace/snippets/treeItemFolder'
import { FileTree } from '../../../../../webviews/Workspace/helpers/getFileTree'
import { ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: treeItemFolder()', () => {
  const DEPTH = 0
  const FOLDER_PATH = 'supernatural/winchester'
  const folder: FileTree = {
    files: [],
    folderPath: '',
    folderPathSegment: FOLDER_PATH,
    isRoot: true,
    label: ROOT_FOLDER,
    sub: [],
  }
  const mockState = getMockState()
  const mockRenderVars = getMockRenderVars()

  let iconClosedSpy: sinon.SinonSpy
  let iconOpenSpy: sinon.SinonSpy
  let indentSpy: sinon.SinonSpy
  let selectedIconSpy: sinon.SinonSpy

  setup(() => {
    iconClosedSpy = sinon.spy(icons, 'treeIconClosed')
    iconOpenSpy = sinon.spy(icons, 'treeIconOpen')
    indentSpy = sinon.spy(indent, 'treeIndent')
    selectedIconSpy = sinon.spy(selected, 'listItemIcon')
  })

  teardown(() => {
    iconClosedSpy.restore()
    iconOpenSpy.restore()
    indentSpy.restore()
    selectedIconSpy.restore()
  })

  test('Renders correctly', () => {
    const btnSpy = sinon.spy(buttons, 'listItemButtons')

    const result = treeItemFolder(folder, DEPTH, false, mockRenderVars, mockState)

    expect(result).to.be.a('string')
    expect(result).contains(`data-folder="${folder.folderPathSegment}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`<span class="list__element" title="${folder.label}">`)
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
    btnSpy.restore()
  })

  test('Selected indicator not shown if not selected', () => {
    const result = treeItemFolder(folder, DEPTH, false, mockRenderVars, mockState)

    expect(result).to.be.a('string')
    expect(result).not.contains(`list__styled-item--selected`)

    sinon.assert.notCalled(selectedIconSpy)
  })

  test('Selected indicator shown if selected & closed', () => {
    const mockState = getMockState({ closedFolders: [FOLDER_PATH] })
    const result = treeItemFolder(folder, DEPTH, true, mockRenderVars, {
      ...mockState,
      selected: `${FOLDER_PATH}${path.sep}`,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`list__styled-item--selected`)

    sinon.assert.calledOnce(selectedIconSpy)
  })

  test('Selected indicator not shown if selected & not closed', () => {
    const mockState = getMockState({ closedFolders: [FOLDER_PATH] })
    treeItemFolder(folder, DEPTH, false, mockRenderVars, {
      ...mockState,
      selected: `${FOLDER_PATH}${path.sep}`,
    })
    sinon.assert.notCalled(selectedIconSpy)
  })

  test('Closed icon shown if closed', () => {
    const mockState = getMockState({ closedFolders: [FOLDER_PATH] })
    treeItemFolder(folder, DEPTH, true, mockRenderVars, mockState)

    sinon.assert.calledOnce(iconClosedSpy)
    sinon.assert.notCalled(iconOpenSpy)
  })

  test('Open icon shown if not closed', () => {
    treeItemFolder(folder, DEPTH, false, mockRenderVars, mockState)

    sinon.assert.notCalled(iconClosedSpy)
    sinon.assert.calledOnce(iconOpenSpy)
  })

  test('Root folders do no have the closable class', () => {
    const result = treeItemFolder(folder, DEPTH, false, mockRenderVars, mockState)
    expect(result).not.contains(`list__branch-list-item-folder-closable`)
  })

  test('Non-root folders do have the closable class', () => {
    const result = treeItemFolder(
      { ...folder, isRoot: false },
      DEPTH,
      false,
      mockRenderVars,
      mockState
    )
    expect(result).contains(`list__branch-list-item-folder-closable`)
  })
})
