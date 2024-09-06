import { expect } from 'chai'
import { CONFIG_DEPTH } from '../../../../../constants/config'
import { FindRootFolderFiles } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockFileList, ROOT_FOLDER_PATH } from '../../../../mocks/mockFileData'

suite.only('Webviews > Workspace > Helpers > reorderRootFolders():', () => {
  /* const configId = 'root-folder-1'
  const newIndex = 2 */
  const rootFoldersFiles: FindRootFolderFiles[] = [
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
  ]

  test('Returns the path between the start folder and the file extension', () => {
    //const rootFolders = getMockRootFolders({ rootFoldersFiles })
    //const result = reorderRootFolders()
    expect(true).to.equal(false)
  })
})
