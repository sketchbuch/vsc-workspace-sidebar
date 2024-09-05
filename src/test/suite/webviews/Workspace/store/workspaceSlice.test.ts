import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import { getInitialRootFolders } from '../../../../../webviews/Workspace/store/initialStates'
import { WorkspaceStateRootFolder } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { OS_HOMEFOLDER, ROOT_FOLDER, ROOT_FOLDER_USERPATH } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Store > workspaceSlice > getInitialRootFolders()', () => {
  let osStub: sinon.SinonStub

  setup(() => {
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    osStub.restore()
  })

  test('Returns an empty array if folders', () => {
    const result = getInitialRootFolders([])
    expect(result).to.eql([])
  })

  test('Returns expected state root folder', () => {
    const result = getInitialRootFolders([
      {
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        depth: CONFIG_DEPTH,
        id: 'root-folder-1',
        path: ROOT_FOLDER_USERPATH,
      },
    ])
    const expectedRootFolder: WorkspaceStateRootFolder = {
      allFolders: [],
      closedFolders: [],
      configId: 'root-folder-1',
      convertedFiles: [],
      depth: CONFIG_DEPTH,
      files: [],
      fileTree: null,
      folderName: ROOT_FOLDER,
      folderPath: ROOT_FOLDER_USERPATH.replace(`~`, OS_HOMEFOLDER),
      folderPathShort: ROOT_FOLDER_USERPATH.replace(OS_HOMEFOLDER, `~`),
      result: 'loading',
      visibleFiles: [],
    }

    expect(result).to.eql([expectedRootFolder])
  })
})
