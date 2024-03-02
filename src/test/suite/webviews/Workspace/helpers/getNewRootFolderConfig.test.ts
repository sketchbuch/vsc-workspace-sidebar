import { expect } from 'chai'
import * as pathLib from 'path'
import * as sinon from 'sinon'
import * as foldersConfigs from '../../../../../config/folders'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import { isWindows } from '../../../../../utils/os/isWindows'
import { ConfigRootFolderSettings } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getNewRootFolderConfig } from '../../../../../webviews/Workspace/helpers/getNewRootFolderConfig'
import { getMockUri } from '../../../../mocks/mockExtensionUri'
import { OS_HOMEFOLDER, OS_HOMEFOLDER_WIN } from '../../../../mocks/mockFileData'

suite('Config > Helpers > getNewRootFolderConfig():', function () {
  const isWin = isWindows()

  const getPath = (folder: string): string => {
    if (isWin) {
      return pathLib.join(OS_HOMEFOLDER_WIN, folder)
    }

    return `${pathLib.sep}${pathLib.join(OS_HOMEFOLDER, folder)}`
  }

  const defaultPaths: ConfigRootFolderSettings[] = [
    {
      path: getPath('Dev'),
    },
    {
      path: getPath('Public'),
      excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
    },
    {
      path: getPath('Temp'),
      depth: CONFIG_DEPTH,
    },
  ]

  let foldersConfigStub: sinon.SinonStub

  setup(() => {
    foldersConfigStub = sinon
      .stub(foldersConfigs, 'getRawFoldersConfig')
      .callsFake(() => defaultPaths)
  })

  teardown(() => {
    foldersConfigStub.restore()
  })

  test('New workspace is added', () => {
    const workspaceFile = getMockUri()
    const result = getNewRootFolderConfig(workspaceFile)
    const path = pathLib.dirname(
      isWin
        ? workspaceFile.fsPath.charAt(0).toLowerCase() + workspaceFile.fsPath.slice(1)
        : workspaceFile.fsPath
    )

    expect(result).to.eql([
      {
        path,
      },
      ...defaultPaths,
    ])
  })
})
