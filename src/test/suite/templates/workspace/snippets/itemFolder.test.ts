import { expect } from 'chai'
import os from 'os'
import * as path from 'path'
import * as sinon from 'sinon'
import * as buttons from '../../../../../templates/workspace/snippets/itemButtons'
import { itemFolder } from '../../../../../templates/workspace/snippets/itemFolder'
import * as icons from '../../../../../templates/workspace/snippets/itemIcons'
import * as indent from '../../../../../templates/workspace/snippets/itemIndent'
import { FileTree } from '../../../../../webviews/Workspace/helpers/getFileTree'
import { OS_HOMEFOLDER, ROOT_FOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockRootFolders, getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: itemFolder()', () => {
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

  test('Renders correctly', () => {
    const result = itemFolder(folder, DEPTH, false, mockState, mockRenderVars)

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

  test('Renders correctly if isFolderError is "true"', () => {
    const result = itemFolder(folder, DEPTH, false, mockState, mockRenderVars, true)

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

  test('Root folders have root class', () => {
    const result = itemFolder({ ...folder, isRoot: true }, DEPTH, false, mockState, mockRenderVars)

    expect(result).contains(`list__branch-list-item-folder--root`)
  })

  suite('Indent:', () => {
    test('Does not render indent if depth 0', () => {
      const mockRootFolders = getMockRootFolders({ showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      const result = itemFolder(folder, 0, true, mockState, mockRenderVars)

      expect(result).not.contains(`list_branch-indent-box`)
      expect(result).not.contains(`list_branch-indent`)
    })

    test('Renders indent if depth >= 1', () => {
      const mockRootFolders = getMockRootFolders({ showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      const result = itemFolder(folder, 1, true, mockState, mockRenderVars)

      expect(result).contains(`list_branch-indent-box`)
    })
  })

  suite('Close/open icons:', () => {
    test('Closed icon shown if closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })

      itemFolder(folder, DEPTH, true, mockState, mockRenderVars)

      sinon.assert.calledOnce(iconClosedSpy)
      sinon.assert.notCalled(iconOpenSpy)
    })

    test('Open icon shown if not closed', () => {
      itemFolder(folder, DEPTH, false, mockState, mockRenderVars)

      sinon.assert.notCalled(iconClosedSpy)
      sinon.assert.calledOnce(iconOpenSpy)
    })
  })

  suite('Selected indicator:', () => {
    test('Not shown if not selected', () => {
      const result = itemFolder(folder, DEPTH, false, mockState, mockRenderVars)

      expect(result).to.be.a('string')
      expect(result).not.contains(`list__styled-item--selected`)

      sinon.assert.notCalled(selectedIconSpy)
    })

    test('Shown if selected & closed', () => {
      const mockRootFolders = getMockRootFolders({ closedFolders: [FOLDER_PATH], showTree: true })
      const mockState = getMockState({ ...mockRootFolders })
      const result = itemFolder(
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
