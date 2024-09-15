import { expect } from 'chai'
import path from 'path'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import {
  UpdatedRootFolder,
  updateRootFolders,
} from '../../../../../webviews/Workspace/helpers/updateRootFolders'
import {
  ConfigRootFolder,
  FindRootFolderFiles,
  WorkspaceStateRootFolder,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockFileList, ROOT_FOLDER_USERPATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders } from '../../../../mocks/mockState'

type GetData = {
  configFolders: ConfigRootFolder[]
  expected: UpdatedRootFolder[]
  rootFolders: WorkspaceStateRootFolder[]
}

suite.only('Webviews > Workspace > Helpers > updateRootFolders():', () => {
  const getData = (itemCount: number = 3): GetData => {
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
      {
        depth: CONFIG_DEPTH,
        files: getMockFileList(),
        folderPath: configFolders[0].path,
        result: 'ok',
      },
      {
        depth: CONFIG_DEPTH,
        files: getMockFileList(),
        folderPath: configFolders[1].path,
        result: 'ok',
      },
      {
        depth: CONFIG_DEPTH,
        files: getMockFileList(),
        folderPath: configFolders[2].path,
        result: 'ok',
      },
    ]
    const rootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders
    const expected: UpdatedRootFolder[] = [
      {
        id: rootFolders[0].configId,
        rootFolder: rootFolders[0],
        status: 'same',
      },
      {
        id: rootFolders[1].configId,
        rootFolder: rootFolders[1],
        status: 'same',
      },
      {
        id: rootFolders[2].configId,
        rootFolder: rootFolders[2],
        status: 'same',
      },
    ]

    return {
      configFolders: configFolders.slice(0, itemCount),
      expected: expected.slice(0, itemCount),
      rootFolders: rootFolders.slice(0, itemCount),
    }
  }

  test('Returns an empty array if no configFolders', () => {
    const { rootFolders } = getData()
    const result = updateRootFolders({ configFolders: [], rootFolders })
    expect(result).to.eql([])
  })

  test('Returns an array of expected rootFolder data', () => {
    const { configFolders, expected, rootFolders } = getData()
    const result = updateRootFolders({ configFolders, rootFolders })
    expect(result).to.eql(expected)
  })

  test('Returns an array of expected rootFolder data if there is a change', () => {
    //const { configFolders, rootFolders } = getData()
  })
})
