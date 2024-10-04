import { expect } from 'chai'
import path from 'path'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import {
  UpdatedRootFolder,
  updateRootFolders,
} from '../../../../../webviews/Workspace/helpers/updateRootFolders'
import { getInitialRootFolder } from '../../../../../webviews/Workspace/store/initialStates'
import {
  ConfigRootFolder,
  FindRootFolderFiles,
  WorkspaceStateRootFolder,
} from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getMockFileList, ROOT_FOLDER_USERPATH } from '../../../../mocks/mockFileData'
import { getMockRootFolders } from '../../../../mocks/mockState'

type GetDataResult = {
  configFolders: ConfigRootFolder[]
  expected: UpdatedRootFolder[]
  rootFolders: WorkspaceStateRootFolder[]
}

type GetDataProps = {
  itemCount: number
  rootFolderData?: Pick<WorkspaceStateRootFolder, 'configId'>[]
}

type GetData = (props?: GetDataProps) => GetDataResult

suite('Webviews > Workspace > Helpers > updateRootFolders():', () => {
  const id = 'b4052f99-2c10-5f00-9aac-f46a2e087558'

  const getData: GetData = ({ itemCount } = { itemCount: 3, rootFolderData: [] }) => {
    const configFolders: ConfigRootFolder[] = [
      {
        depth: CONFIG_DEPTH,
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        id: 'a6edc906-2f9f-5fb2-a373-efac406f0ef2',
        path: `${ROOT_FOLDER_USERPATH}${path.sep}folder_1`,
      },
      {
        depth: CONFIG_DEPTH,
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        id: '77d2a89c-6cc6-5569-a56e-154cf8f99075',
        path: `${ROOT_FOLDER_USERPATH}${path.sep}folder_2`,
      },
      {
        depth: CONFIG_DEPTH,
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        id: '70c89d11-ad22-51d8-aa6c-aa0301c1a513',
        path: `${ROOT_FOLDER_USERPATH}${path.sep}folder_3`,
      },
    ]

    const files = getMockFileList()

    const rootFoldersFiles: FindRootFolderFiles[] = [
      {
        depth: CONFIG_DEPTH,
        files,
        folderPath: configFolders[0].path,
        result: 'ok',
      },
      {
        depth: CONFIG_DEPTH,
        files,
        folderPath: configFolders[1].path,
        result: 'ok',
      },
      {
        depth: CONFIG_DEPTH,
        files,
        folderPath: configFolders[2].path,
        result: 'ok',
      },
    ]

    const rootFolders = getMockRootFolders({ rootFoldersFiles }).rootFolders.map((rf, index) => {
      return { ...rf, configId: configFolders[index].id }
    })

    const expected: UpdatedRootFolder[] = [
      {
        configFolder: configFolders[0],
        id: rootFolders[0].configId,
        rootFolder: rootFolders[0],
        status: 'same',
      },
      {
        configFolder: configFolders[1],
        id: rootFolders[1].configId,
        rootFolder: rootFolders[1],
        status: 'same',
      },
      {
        configFolder: configFolders[2],
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
    expect(result.length).to.equal(3)
    expect(result).to.eql(expected)
  })

  test('Returns an array of expected rootFolder data if there is a change', () => {
    const { configFolders, expected, rootFolders } = getData({ itemCount: 1 })
    const testConfigFolders = [{ ...configFolders[0], id }]
    const testExpected = [
      { ...expected[0], status: 'changed', id, configFolder: { ...expected[0].configFolder, id } },
    ]

    const result = updateRootFolders({ configFolders: testConfigFolders, rootFolders })
    expect(result.length).to.equal(1)
    expect(result).to.eql(testExpected)
  })

  test('Returns an array of expected rootFolder data if there is a new folder', () => {
    const { configFolders, expected, rootFolders } = getData({ itemCount: 2 })
    const testConfigFolders = [...configFolders]

    testConfigFolders.push({
      depth: CONFIG_DEPTH,
      excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
      id,
      path: `${ROOT_FOLDER_USERPATH}${path.sep}folder_4`,
    })
    const testExpected = [
      ...expected,
      {
        configFolder: testConfigFolders[2],
        id,
        rootFolder: getInitialRootFolder(testConfigFolders[2]),
        status: 'new',
      },
    ]

    const result = updateRootFolders({ configFolders: testConfigFolders, rootFolders })
    expect(result.length).to.equal(3)
    expect(result).to.eql(testExpected)
  })
})
