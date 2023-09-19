import { expect } from 'chai'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import { setFileTree } from '../../../../../webviews/Workspace/store/setFileTree'
import { ROOT_FOLDER_PATH, file1, file2 } from '../../../../mocks/mockFileData'
import { getMockState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Store > setFileTree()', () => {
  let compactConfigStub: sinon.SinonStub
  let condenseConfigStub: sinon.SinonStub
  let folderConfigStub: sinon.SinonStub

  setup(() => {
    compactConfigStub = sinon.stub(configs, 'getExplorerCompactFoldersConfig').callsFake(() => true)
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true)
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH)
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
        folderPath: '/home/user/dev',
        folderPathSegment: 'dev',
        isRoot: true,
        label: 'dev',
        sub: [
          {
            files: [
              {
                file: '/home/user/dev/code/vscode/Vscode.code-workspace',
                isSelected: false,
                label: 'Vscode',
                path: 'code/vscode',
                showPath: true,
              },
              {
                file: '/home/user/dev/code/vscode/some_ext/Some Extension.code-workspace',
                isSelected: false,
                label: 'Some Extension',
                path: 'code/vscode/some_ext',
                showPath: true,
              },
            ],
            folderPath: '/home/user/dev/code/vscode',
            folderPathSegment: 'code/vscode',
            isRoot: false,
            label: 'code/vscode',
            sub: [],
          },
        ],
      },
      treeFolders: ['code/vscode'],
      visibleFiles: [file1, file2],
    })

    expect(state).not.to.eql(expectedState)
    setFileTree(state)
    expect(state).to.eql(expectedState)
  })
})
