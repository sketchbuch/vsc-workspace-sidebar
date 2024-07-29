import { expect } from 'chai'
import os from 'os'
import * as sinon from 'sinon'
import { CONFIG_DEPTH, CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../../constants/config'
import { getItitialRootFolders } from '../../../../../webviews/Workspace/store/workspaceSlice'
import { OS_HOMEFOLDER, ROOT_FOLDER, ROOT_FOLDER_USERPATH } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Store > workspaceSlice > getItitialRootFolders()', () => {
  let osStub: sinon.SinonStub

  setup(() => {
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    osStub.restore()
  })

  test('Returns an empty array if folders', () => {
    const result = getItitialRootFolders([])
    expect(result).to.eql([])
  })

  test('Returns expected state root folder', () => {
    const result = getItitialRootFolders([
      {
        excludeHiddenFolders: CONFIG_EXCLUDE_HIDDEN_FODLERS,
        depth: CONFIG_DEPTH,
        path: ROOT_FOLDER_USERPATH,
      },
    ])
    expect(result).to.eql([
      {
        allFolders: [],
        closedFolders: [],
        convertedFiles: [],
        depth: CONFIG_DEPTH,
        files: [],
        fileTree: null,
        folderName: ROOT_FOLDER,
        folderPath: ROOT_FOLDER_USERPATH.replace(`~`, OS_HOMEFOLDER),
        folderPathShort: ROOT_FOLDER_USERPATH.replace(OS_HOMEFOLDER, `~`),
        result: 'loading',
        visibleFiles: [],
      },
    ])
  })
})
