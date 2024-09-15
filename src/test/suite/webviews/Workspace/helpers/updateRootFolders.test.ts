import { expect } from 'chai'
import path from 'path'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import { updateRootFolders } from '../../../../../webviews/Workspace/helpers/updateRootFolders'
import {
  ConfigRootFolder,
  FindRootFolderFiles,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  getMockFileList,
  ROOT_FOLDER_PATH,
  ROOT_FOLDER_USERPATH,
} from '../../../../mocks/mockFileData'
import { getMockRootFolders } from '../../../../mocks/mockState'

suite.only('Webviews > Workspace > Helpers > updateRootFolders():', () => {
  const configFolders: ConfigRootFolder[] = [
    {
      depth: CONFIG_DEPTH,
      excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
      id: 'root-folder-1',
      path: ROOT_FOLDER_USERPATH,
    },
    {
      depth: CONFIG_DEPTH,
      excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
      id: 'root-folder-2',
      path: `${ROOT_FOLDER_USERPATH}${path.sep}test`,
    },
    {
      depth: CONFIG_DEPTH,
      excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
      id: 'root-folder-3',
      path: `${ROOT_FOLDER_USERPATH}${path.sep}subtest`,
    },
  ]
  const rootFoldersFiles: FindRootFolderFiles[] = [
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
    { depth: CONFIG_DEPTH, files: getMockFileList(), folderPath: ROOT_FOLDER_PATH, result: 'ok' },
  ]
  const rootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders

  test('Returns an empty array', () => {
    const result = updateRootFolders({ configFolders, rootFolders })

    expect(result).to.eql([])
  })
})
