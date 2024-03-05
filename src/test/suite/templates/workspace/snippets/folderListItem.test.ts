import { expect } from 'chai'
import { folderListItem } from '../../../../../templates/workspace/snippets/folderListItem'
import { getMockWorkspaceFolders } from '../../../../mocks/mockWorkspaceFolders'

suite('Templates > Workspace > Snippets: folderListItem()', () => {
  const folder = getMockWorkspaceFolders(1)[0]

  test('Renders folder item', () => {
    const result = folderListItem(folder)

    expect(result).to.be.a('string')
    expect(result).contains(`title="${folder.name}`)
    expect(result).contains(`<span class="list__title">${folder.name}</span>`)
    expect(result).contains(`data-file="${folder.uri.fsPath}`)
    expect(result).contains(`<span class="list__description">${folder.uri.fsPath}</span>`)
  })
})
