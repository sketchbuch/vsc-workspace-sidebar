import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import { getShowPathsConfig } from '../../../config/listview'
import { ConfigShowPaths } from '../../../constants/config'

suite('Config > List View:', () => {
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

  test('getShowPathsConfig() returns the default if no config value is set', () => {
    expect(getShowPathsConfig()).to.equal(ConfigShowPaths.NEVER)
  })
})
