import { expect } from 'chai'
import { WorkspaceButton } from '../../../../../templates/helpers/getWorkspaceButtons'
import { listItemButton } from '../../../../../templates/workspace/snippets/listItemButton'
import { File } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { file1 } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: listItemButton()', () => {
  const file: File = { ...file1, showPath: false }
  const button: WorkspaceButton = {
    ariaLabel: 'not important',
    file: file.file,
    renderVars: getMockRenderVars(),
    tooltip: 'not important',
    type: 'open-filemanager',
  }

  test('Renders codicon button correctly', () => {
    const codicon = 'typescript'
    const result = listItemButton({ ...button, codicon })

    expect(result).to.be.a('string')
    expect(result).contains('class="list__button"')
    expect(result).contains(`class="codicon codicon-${codicon}"`)
    expect(result).not.contains('<img')
  })

  test('Renders image button correctly', () => {
    const result = listItemButton(button)

    expect(result).to.be.a('string')
    expect(result).contains('class="list__button"')
    expect(result).contains('<img alt="" data-theme="dark"')
    expect(result).contains('<img alt="" data-theme="light"')
    expect(result).not.contains(`class="codicon`)
  })
})
