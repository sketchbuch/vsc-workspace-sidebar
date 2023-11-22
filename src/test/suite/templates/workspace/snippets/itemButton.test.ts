import { expect } from 'chai'
import { WorkspaceButton } from '../../../../../templates/helpers/getWorkspaceButtons'
import { itemButton } from '../../../../../templates/workspace/snippets/itemButton'
import { File } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { file1 } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'

suite('Templates > Workspace > Snippets: itemButton()', () => {
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
    const result = itemButton({ ...button, codicon })

    expect(result).to.be.a('string')
    expect(result).contains('class="list__button"')
    expect(result).contains(`class="codicon codicon-${codicon}"`)
    expect(result).not.contains('<img')
  })

  test('Renders image button correctly', () => {
    const result = itemButton(button)

    expect(result).to.be.a('string')
    expect(result).contains('class="list__button"')
    expect(result).contains('<img alt="" data-theme="dark"')
    expect(result).contains('<img alt="" data-theme="light"')
    expect(result).not.contains(`class="codicon`)
  })
})
