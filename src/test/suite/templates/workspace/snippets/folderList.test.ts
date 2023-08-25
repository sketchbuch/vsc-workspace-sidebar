import { expect } from 'chai'
import * as sinon from 'sinon'
import { folderList } from '../../../../../templates/workspace/snippets/folderList'
import * as fli from '../../../../../templates/workspace/snippets/folderListItem'
import { getMockState } from '../../../../mocks/mockState'
import { getMockWorkspaceFolders } from '../../../../mocks/mockWorkspaceFolders'

suite('Templates > Workspace > Snippets: folderList()', () => {
  const folder = getMockWorkspaceFolders(1)
  const folders = getMockWorkspaceFolders(2)

  test('Renders nothing if wsType is not "folder"', () => {
    const mockState = getMockState({ wsType: 'ws' })
    const result = folderList(mockState, undefined)

    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })

  test('Renders nothing if there are no workspaceFolders', () => {
    const mockState = getMockState({ wsType: 'folder' })
    const result = folderList(mockState, undefined)

    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })

  test('Renders content if there are workspaceFolders and wsType is "folder"', () => {
    const mockState = getMockState({ wsType: 'folder' })
    const result = folderList(mockState, folder)

    expect(result).to.be.a('string')
    expect(result).not.to.equal('')
  })

  test('Renders singular title for 1 folder', () => {
    const mockState = getMockState({ wsType: 'folder' })
    const result = folderList(mockState, folder)

    expect(result).contains('Current open folder:')
  })

  test('Renders plural title for 2 folder', () => {
    const mockState = getMockState({ wsType: 'folder' })
    const result = folderList(mockState, folders)

    expect(result).contains('Current open folders:')
  })

  test('Renders the save ws button', () => {
    const mockState = getMockState({ wsType: 'folder' })
    const result = folderList(mockState, folders)

    expect(result).contains('<vscode-button class="list__folder-save" id="saveFolderAsWorkspace">')
    expect(result).contains('Save as new Workspace')
  })

  test('Renders the folder list items', () => {
    const fliSpy = sinon.spy(fli, 'folderListItem')

    const mockState = getMockState({ wsType: 'folder' })
    folderList(mockState, folders)
    sinon.assert.callCount(fliSpy, 2)
    expect(fliSpy.args[0][0]).to.eql(folders[0])
    expect(fliSpy.args[1][0]).to.eql(folders[1])

    fliSpy.restore()
  })
})
