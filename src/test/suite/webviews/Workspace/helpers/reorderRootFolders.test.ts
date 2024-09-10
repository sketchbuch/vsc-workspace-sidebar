import { expect } from 'chai'
import { CONFIG_DEPTH } from '../../../../../constants/config'
import { reorderRootFolders } from '../../../../../webviews/Workspace/helpers/reorderRootFolders'
import { FindRootFolderFiles } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockFileList, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders } from '../../../../mocks/mockState'

suite.only('Webviews > Workspace > Helpers > reorderRootFolders():', () => {
  const configId = 'root-folder-1'
  const newIndex = 2
  const rootFoldersFiles: FindRootFolderFiles[] = [
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
  ]

  test('Returns an array with just the rootFolder if there are no rootFolders', () => {
    const mockRootFolder = getMockRootFolders({ rootFoldersFiles }).rootFolders[0]
    const result = reorderRootFolders(configId, newIndex, mockRootFolder, [])

    expect(result).to.eql([mockRootFolder])
  })

  test('Returns an array with the first rootFolder moved to last element', () => {
    const mockRootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders
    const mockRootFolder = mockRootFolders[0]
    const result = reorderRootFolders(configId, newIndex, mockRootFolder, mockRootFolders)

    expect(result).to.eql([mockRootFolders[1], mockRootFolders[2], mockRootFolder])
  })

  test('Returns an array with the last rootFolder moved to first element', () => {
    const mockRootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders
    const mockRootFolder = mockRootFolders[2]
    const result = reorderRootFolders('root-folder-3', 0, mockRootFolder, mockRootFolders)

    expect(result).to.eql([mockRootFolder, mockRootFolders[0], mockRootFolders[1]])
  })

  test('Returns an array with the rootFolders left as is if nothing has been moved', () => {
    const mockRootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders
    const mockRootFolder = mockRootFolders[1]
    const result = reorderRootFolders('root-folder-2', 1, mockRootFolder, mockRootFolders)

    expect(result).to.eql(mockRootFolders)
  })
})
