import { expect } from 'chai'
import * as sinon from 'sinon'
import { workspace, WorkspaceConfiguration } from 'vscode'
import { getCondenseFileTreeConfig, getShowTreeConfig } from '../../../config/treeview'
import { CONFIG_CONDENSE_FILETREE, CONFIG_SHOW_HIERARCHY } from '../../../constants/config'

suite('Config > Tree View:', () => {
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

  test('getCondenseFileTreeConfig() returns the default if no config value is set', () => {
    expect(getCondenseFileTreeConfig()).to.equal(CONFIG_CONDENSE_FILETREE)
  })

  test('getShowTreeConfig() returns the default if no config value is set', () => {
    expect(getShowTreeConfig()).to.equal(CONFIG_SHOW_HIERARCHY)
  })
})
