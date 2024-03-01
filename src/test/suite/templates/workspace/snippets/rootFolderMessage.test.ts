import { expect } from 'chai'
import { CONFIG_DEPTH } from '../../../../../constants/config'
import { rootFolderMessage } from '../../../../../templates/workspace/snippets/rootFolderMessage'
import { FindFileResult } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'

suite.only('Templates > Workspace > Snippets: rootFolderMessage()', () => {
  const results: FindFileResult[] = [
    'is-file',
    'is-hidden-excluded',
    'no-workspaces',
    'nonexistent',
  ]

  results.forEach((res) => {
    test(`"${res}" renders expected message`, () => {
      const result = rootFolderMessage(res, CONFIG_DEPTH)

      expect(result).to.be.a('string')
      expect(result).contains('"rootfolder__message"')
      expect(result).contains(`data-type="${res}"`)
    })
  })

  test(`Other results render default message`, () => {
    const result = rootFolderMessage('ok', CONFIG_DEPTH)

    expect(result).to.be.a('string')
    expect(result).contains('"rootfolder__message rootfolder__message--default"')
    expect(result).contains(`data-type="ok"`)
  })
})
