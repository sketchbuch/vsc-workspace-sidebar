import { expect } from 'chai'
import * as path from 'path'
import * as sinon from 'sinon'
import * as coreConfigs from '../../../../../config/core'
import * as foldersConfigs from '../../../../../config/folders'
import * as treeConfigs from '../../../../../config/treeview'
import { setFileTree } from '../../../../../webviews/Workspace/store/setFileTree'
import { ROOT_FOLDER_PATH, file1, file2 } from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setFileTree()', () => {
  let compactConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon
      .stub(coreConfigs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => true)
    condenseConfigStub = sinon.stub(treeConfigs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon
      .stub(foldersConfigs, 'getFolderConfig')
      .callsFake(() => ROOT_FOLDER_PATH)
  })

  teardown(() => {
    compactConfigStub.restore()
    condenseConfigStub.restore()
    folderConfigStub.restore()
  })

  test('Updates state as expected', () => {
    const state = getMockState({
      visibleFiles: [file1, file2],
    })
    const expectedState = getMockState({
      fileTree: {
        files: [],
        folderPath: path.join('home', 'user', 'dev'),
        folderPathSegment: 'dev',
        isRoot: true,
        label: 'dev',
        sub: [
          {
            files: [
              {
                cleanedLabel: 'Vscode',
                file: path.join('home', 'user', 'dev', 'code', 'vscode', 'Vscode.code-workspace'),
                isSelected: false,
                label: 'Vscode',
                path: path.join('code', 'vscode'),
                showPath: true,
              },
              {
                cleanedLabel: 'Some Extension',
                file: path.join(
                  'home',
                  'user',
                  'dev',
                  'code',
                  'vscode',
                  'some_ext',
                  'Some Extension.code-workspace'
                ),
                isSelected: false,
                label: 'Some Extension',
                path: path.join('code', 'vscode', 'some_ext'),
                showPath: true,
              },
            ],
            folderPath: path.join('home', 'user', 'dev', 'code', 'vscode'),
            folderPathSegment: path.join('code', 'vscode'),
            isRoot: false,
            label: path.join('code', 'vscode'),
            sub: [],
          },
        ],
      },
      treeFolders: [path.join('code', 'vscode')],
      visibleFiles: [file1, file2],
    })

    expect(state).not.to.eql(expectedState)
    setFileTree(state)
    expect(state).to.eql(expectedState)
  })
})
