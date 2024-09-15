import { expect } from 'chai'
import { CONFIG_DEPTH } from '../../../../../constants/config'
import { reorderRootFolders } from '../../../../../webviews/Workspace/helpers/reorderRootFolders'
import { FindRootFolderFiles } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockFileList, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Helpers > reorderRootFolders():', () => {
  const rootFoldersFiles: FindRootFolderFiles[] = [
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
  ]

  test('Returns an array with just the rootFolder if there are no rootFolders', () => {
    const mockRootFolder = getMockRootFolders({ rootFoldersFiles }).rootFolders[0]
    const result = reorderRootFolders({
      configId: 'root-folder-1',
      configIndex: 2,
      rootFolder: mockRootFolder,
      rootFolders: [],
    })

    expect(result).to.eql([mockRootFolder])
  })

  suite('3 Elements:', () => {
    const mockRootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders

    test('Returns an array with the first rootFolder moved to last element', () => {
      const mockRootFolder = mockRootFolders[0]
      const result = reorderRootFolders({
        configId: 'root-folder-1',
        configIndex: 2,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolders[1], mockRootFolders[2], mockRootFolder])
    })

    test('Returns an array with the first rootFolder moved to second element', () => {
      const mockRootFolder = mockRootFolders[0]
      const result = reorderRootFolders({
        configId: 'root-folder-1',
        configIndex: 1,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolders[1], mockRootFolder, mockRootFolders[2]])
    })

    test('Returns an array with the last rootFolder moved to first element', () => {
      const mockRootFolder = mockRootFolders[2]
      const result = reorderRootFolders({
        configId: 'root-folder-3',
        configIndex: 0,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolder, mockRootFolders[0], mockRootFolders[1]])
    })

    test('Returns an array with the last rootFolder moved to second element', () => {
      const mockRootFolder = mockRootFolders[2]
      const result = reorderRootFolders({
        configId: 'root-folder-3',
        configIndex: 1,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolders[0], mockRootFolder, mockRootFolders[1]])
    })

    test('Returns an array with the rootFolders left as is if nothing has been moved', () => {
      const mockRootFolder = mockRootFolders[1]
      const result = reorderRootFolders({
        configId: 'root-folder-2',
        configIndex: 1,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql(mockRootFolders)
    })
  })

  suite('2 Elements:', () => {
    const mockRootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders.slice(0, 2)

    test('Returns an array with the first rootFolder moved to last element', () => {
      const mockRootFolder = mockRootFolders[0]
      const result = reorderRootFolders({
        configId: 'root-folder-1',
        configIndex: 1,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolders[1], mockRootFolder])
    })

    test('Returns an array with the last rootFolder moved to first element', () => {
      const mockRootFolder = mockRootFolders[1]
      const result = reorderRootFolders({
        configId: 'root-folder-2',
        configIndex: 0,
        rootFolder: mockRootFolder,
        rootFolders: mockRootFolders,
      })

      expect(result).to.eql([mockRootFolder, mockRootFolders[0]])
    })
  })
})
