import { expect } from 'chai'
import path from 'path'
import { FS_WS_FILETYPE } from '../../../../../constants/fs'
import { externalWorkspace } from '../../../../../templates/workspace/snippets/externalWorkspace'
import { OS_HOMEFOLDER } from '../../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../../mocks/mockRenderVars'
import { getMockState } from '../../../../mocks/mockState'

suite('Templates > Workspace > Snippets: externalWorkspace()', () => {
  const fileLabel = 'Video1'
  const fileName = `${fileLabel}.${FS_WS_FILETYPE}`
  const folder = 'Videos'
  const selected = path.join(OS_HOMEFOLDER, folder, fileName)

  test('Renders empty string of not external ws', () => {
    const result = externalWorkspace(getMockState(), getMockRenderVars({ isExternalWs: false }))

    expect(result).to.be.a('string')
    expect(result).to.be.empty
  })

  test('Renders content if external ws', () => {
    const result = externalWorkspace(
      getMockState({ selected }),
      getMockRenderVars({ isExternalWs: true })
    )

    expect(result).to.be.a('string')
    expect(result).contains('class="list__folder-vscodedivider"')
    expect(result).contains('class="list__styled-item')
    expect(result).contains(`<span class="list__title">${folder}</span>`)
    expect(result).contains('class="list__branch-list-item')
    expect(result).contains(`<span class="list__title">${fileLabel}</span>`)
  })

  test('Renders the add to root folders button', () => {
    const result = externalWorkspace(
      getMockState({ selected }),
      getMockRenderVars({ isExternalWs: true })
    )

    expect(result).to.be.a('string')

    expect(result).contains(
      '<vscode-button class="list__extws-update-roots" id="addToFolderRoots">'
    )
    expect(result).contains('Add to Root Folders')
  })
})
