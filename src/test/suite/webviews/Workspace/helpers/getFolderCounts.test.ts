import { expect } from 'chai'
import { getFolderCounts } from '../../../../../webviews/Workspace/helpers/getFolderCounts'
import { getMockRootFolders } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Helpers > getFolderCounts()', () => {
  const { rootFolders } = getMockRootFolders()

  test('Returns 0 for all counts if no root folders', () => {
    const counts = getFolderCounts([])

    expect(counts).to.eql({ fileCount: 0, visibleFileCount: 0 })
  })

  test('Returns the expected counts if their are root folders', () => {
    const counts = getFolderCounts(rootFolders)

    expect(counts).to.eql({ fileCount: 4, visibleFileCount: 4 })
  })
})
