import { expect } from 'chai'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as buttons from '../../../../../templates/workspace/snippets/itemButtons'
import { itemFile } from '../../../../../templates/workspace/snippets/itemFile'
import * as icons from '../../../../../templates/workspace/snippets/itemIcons'
import * as indent from '../../../../../templates/workspace/snippets/itemIndent'
import { DEFAULT_THEME } from '../../../../../theme/constants'
import { file1 } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: itemFile()', () => {
  const DEPTH = 0
  const file = { ...file1, showPath: false }
  const mockRenderVars = getMockRenderVars({ fileIconsActive: false })
  const mockState = getMockState()

  let buttonSpy: sinon.SinonSpy
  let fileiconConfigStub: sinon.SinonStub
  let iconDummySpy: sinon.SinonSpy
  let iconFilethemeSpy: sinon.SinonSpy
  let iconFileSpy: sinon.SinonSpy
  let indentSpy: sinon.SinonSpy
  let selectedIconSpy: sinon.SinonSpy

  setup(() => {
    buttonSpy = sinon.spy(buttons, 'itemButtons')
    fileiconConfigStub = sinon
      .stub(coreConfigs, 'getFileiconThemeConfig')
      .callsFake(() => DEFAULT_THEME)
    iconDummySpy = sinon.spy(icons, 'itemIconDummy')
    iconFilethemeSpy = sinon.spy(icons, 'itemIconFiletheme')
    iconFileSpy = sinon.spy(icons, 'itemIconFile')
    indentSpy = sinon.spy(indent, 'itemIndent')
    selectedIconSpy = sinon.spy(icons, 'itemIconSelected')
  })

  teardown(() => {
    buttonSpy.restore()
    fileiconConfigStub.restore()
    iconDummySpy.restore()
    iconFilethemeSpy.restore()
    iconFileSpy.restore()
    indentSpy.restore()
    selectedIconSpy.restore()
  })

  test('Renders correctly (tree)', () => {
    const result = itemFile({
      depth: 1,
      file,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-file="${file.file}"`)
    expect(result).contains(`data-depth="1"`)
    expect(result).contains(`title="Open '${file.label}' in this window"`)
    expect(result).contains(`<span class="list__title">${file.label}</span>`)
    expect(result).contains('list__branch-list-item list__branch-list-item-file')
    expect(result).contains('list_branch-indent-box')
    expect(result).contains('list_branch-indent')
    expect(result).not.contains('list_branch-indent-list')

    sinon.assert.calledOnce(indentSpy)
    sinon.assert.calledOnce(iconFileSpy)
    sinon.assert.notCalled(iconFilethemeSpy)
  })

  test('Renders correctly (list)', () => {
    const result = itemFile({
      file,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-file="${file.file}"`)
    expect(result).contains(`data-depth="0"`)
    expect(result).contains(`title="Open '${file.label}' in this window"`)
    expect(result).contains(`<span class="list__title">${file.label}</span>`)
    expect(result).not.contains('list__branch-list-item list__branch-list-item-file')
    expect(result).contains('list_branch-indent-box')
    expect(result).contains('list_branch-indent-list')

    sinon.assert.calledOnce(indentSpy)
    sinon.assert.calledOnce(iconFileSpy)
    sinon.assert.notCalled(iconFilethemeSpy)
  })

  suite('Selected indicator:', () => {
    test('Renders correctly when selected', () => {
      const file = { ...file1, showPath: false, isSelected: true }
      const result = itemFile({
        depth: DEPTH,
        file,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).contains(`list__styled-item--selected`)

      sinon.assert.calledOnce(buttonSpy)
      sinon.assert.calledWith(buttonSpy, [
        {
          ariaLabel: `Open folder containing '${file.label}' in your file manager`,
          codicon: 'browser',
          file: file.file,
          renderVars: mockRenderVars,
          tooltip: `Open folder containing '${file.label}' in your file manager`,
          type: 'open-filemanager',
        },
      ])
      sinon.assert.calledOnce(selectedIconSpy)
    })

    test('Renders correctly when not selected', () => {
      const result = itemFile({
        depth: DEPTH,
        file,
        renderVars: mockRenderVars,
        state: mockState,
      })

      expect(result).contains(`list__styled-item--unselected`)

      sinon.assert.calledOnce(buttonSpy)
      sinon.assert.calledWith(buttonSpy, [
        {
          ariaLabel: `Open folder containing '${file.label}' in your file manager`,
          codicon: 'browser',
          file: file.file,
          renderVars: mockRenderVars,
          tooltip: `Open folder containing '${file.label}' in your file manager`,
          type: 'open-filemanager',
        },
        {
          ariaLabel: "Open 'Vscode' in a new window",
          file: file.file,
          renderVars: mockRenderVars,
          tooltip: "Open 'Vscode' in a new window",
          type: 'new-window',
        },
      ])
      sinon.assert.notCalled(selectedIconSpy)
    })
  })

  suite('Description:', () => {
    test('Renders if condensed', () => {
      const file = { ...file1, showPath: true }
      const result = itemFile({
        depth: DEPTH,
        file,
        renderVars: getMockRenderVars({ condenseFileTree: true }),
        state: mockState,
      })

      expect(result).contains(`list__description`)
    })

    test('Does not render if not condensed', () => {
      const file = { ...file1, showPath: true }
      const result = itemFile({
        depth: DEPTH,
        file,
        renderVars: getMockRenderVars({ condenseFileTree: false }),
        state: mockState,
      })

      expect(result).not.contains(`list__description`)
    })
  })

  suite('Icon:', () => {
    test('Renders filetheme icon if needed', () => {
      const file = { ...file1, showPath: true }
      itemFile({
        depth: DEPTH,
        file,
        renderVars: getMockRenderVars({ fileIconsActive: true }),
        state: mockState,
      })

      sinon.assert.notCalled(iconFileSpy)
      sinon.assert.notCalled(iconDummySpy)
      sinon.assert.calledOnce(iconFilethemeSpy)
    })

    test('Renders file icon if no filetheme icons', () => {
      const file = { ...file1, showPath: true }
      itemFile({
        depth: DEPTH,
        file,
        renderVars: getMockRenderVars({ fileIconsActive: false }),
        state: mockState,
      })

      sinon.assert.calledOnce(iconFileSpy)
      sinon.assert.notCalled(iconDummySpy)
      sinon.assert.notCalled(iconFilethemeSpy)
    })

    test('Renders dummy icon if filetheme icons disable', () => {
      fileiconConfigStub.callsFake(() => null)

      const file = { ...file1, showPath: true }
      itemFile({
        depth: DEPTH,
        file,
        renderVars: getMockRenderVars({ fileIconsActive: false }),
        state: mockState,
      })

      sinon.assert.notCalled(iconFileSpy)
      sinon.assert.notCalled(iconFilethemeSpy)
      sinon.assert.calledOnce(iconDummySpy)
    })
  })
})
