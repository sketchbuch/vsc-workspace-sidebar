import { expect } from 'chai'
import * as sinon from 'sinon'
import * as buttons from '../../../../../templates/workspace/snippets/itemButtons'
import { itemFile } from '../../../../../templates/workspace/snippets/itemFile'
import * as icons from '../../../../../templates/workspace/snippets/itemIcons'
import * as indent from '../../../../../templates/workspace/snippets/itemIndent'
import { file1 } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: itemFile()', () => {
  const DEPTH = 0
  const file = { ...file1, showPath: false }
  const mockRenderVars = getMockRenderVars({ fileIconsActive: false })
  const mockState = getMockState()

  let buttonSpy: sinon.SinonSpy
  let iconFileSpy: sinon.SinonSpy
  let iconTreeSpy: sinon.SinonSpy
  let indentSpy: sinon.SinonSpy
  let selectedIconSpy: sinon.SinonSpy

  setup(() => {
    buttonSpy = sinon.spy(buttons, 'itemButtons')
    iconFileSpy = sinon.spy(icons, 'itemIconFiletheme')
    iconTreeSpy = sinon.spy(icons, 'itemIconFile')
    indentSpy = sinon.spy(indent, 'itemIndent')
    selectedIconSpy = sinon.spy(icons, 'itemIconSelected')
  })

  teardown(() => {
    buttonSpy.restore()
    iconFileSpy.restore()
    iconTreeSpy.restore()
    indentSpy.restore()
    selectedIconSpy.restore()
  })

  test('Renders correctly', () => {
    const result = itemFile({
      depth: DEPTH,
      file,
      renderVars: mockRenderVars,
      state: mockState,
    })

    expect(result).to.be.a('string')
    expect(result).contains(`data-file="${file.file}"`)
    expect(result).contains(`data-depth="${DEPTH}"`)
    expect(result).contains(`title="Open '${file.label}' in this window">`)
    expect(result).contains(`<span class="list__title">${file.label}</span>`)

    sinon.assert.calledOnce(indentSpy)
    sinon.assert.calledOnce(iconTreeSpy)
    sinon.assert.notCalled(iconFileSpy)
  })

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
        tooltip: `Open '${file.label}' in your file manager`,
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
        tooltip: `Open '${file.label}' in your file manager`,
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

  test('Renders description if condensed', () => {
    const file = { ...file1, showPath: true }
    const result = itemFile({
      depth: DEPTH,
      file,
      renderVars: getMockRenderVars({ condenseFileTree: true }),
      state: mockState,
    })

    expect(result).contains(`list__description`)
  })

  test('Does not render description if not condensed', () => {
    const file = { ...file1, showPath: true }
    const result = itemFile({
      depth: DEPTH,
      file,
      renderVars: getMockRenderVars({ condenseFileTree: false }),
      state: mockState,
    })

    expect(result).not.contains(`list__description`)
  })

  test('Renders file icon if needed', () => {
    const file = { ...file1, showPath: true }
    itemFile({
      depth: DEPTH,
      file,
      renderVars: getMockRenderVars({ fileIconsActive: true }),
      state: mockState,
    })

    sinon.assert.notCalled(iconTreeSpy)
    sinon.assert.calledOnce(iconFileSpy)
  })

  test('Renders tree icon if no file icons', () => {
    const file = { ...file1, showPath: true }
    itemFile({
      depth: DEPTH,
      file,
      renderVars: getMockRenderVars({ fileIconsActive: false }),
      state: mockState,
    })

    sinon.assert.calledOnce(iconTreeSpy)
    sinon.assert.notCalled(iconFileSpy)
  })
})
