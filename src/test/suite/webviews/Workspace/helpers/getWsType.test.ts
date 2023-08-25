import { expect } from 'chai'
import { Uri } from 'vscode'
import { getWsType } from '../../../../../webviews/Workspace/helpers/getWsType'

suite('Webviews > Workspace > Helpers > getWsType():', () => {
  test('Returns "none" if no workspaceFile and no workspaceFolders', () => {
    const result = getWsType(undefined, undefined)
    expect(result).to.equal('none')
  })

  test('Returns "folder" if no workspaceFile but has workspaceFolders', () => {
    const result = getWsType(undefined, [])
    expect(result).to.equal('folder')
  })

  test('Returns "folder" if workspaceFile and scheme is "untitled"', () => {
    const result = getWsType({ scheme: 'untitled' } as Uri, [])
    expect(result).to.equal('folder')
  })

  test('Returns "ws" if workspaceFile and scheme is not "untitled"', () => {
    const result = getWsType({ scheme: '' } as Uri, [])
    expect(result).to.equal('ws')
  })
})
