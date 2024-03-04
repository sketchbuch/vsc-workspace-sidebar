import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import { getExplorerCompactFoldersConfig } from '../../../config/core'
import { CONFIG_EXPLORER_COMPACT_FOLDERS } from '../../../constants/config'

suite('Config > Core:', () => {
  let stub: sinon.SinonStub

  setup(() => {
    stub = sinon.stub(workspace, 'getConfiguration').callsFake(() => {
      return {
        get: (section: string) => {
          return undefined
        },
      } as WorkspaceConfiguration
    })
  })

  teardown(() => {
    stub.restore()
  })

  test('getExplorerCompactFoldersConfig() returns the default if no config value is set', () => {
    expect(getExplorerCompactFoldersConfig()).to.equal(CONFIG_EXPLORER_COMPACT_FOLDERS)
  })
})
