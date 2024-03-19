import { expect } from 'chai'
import { getCompactedFolder } from '../../../../../webviews/Workspace/helpers/getCompactedFolder'
import { getMockFileTree } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > getCompactedFolder():', () => {
  test('Returns the ws file name reformatted to Title Case if clean = "true"', () => {
    const fileTree = getMockFileTree('normal')
    const branch = fileTree.sub[0].sub[0]
    const result = getCompactedFolder(branch)

    expect(result).to.eql({
      folderPath: branch.folderPath,
      folderPathSegment: branch.folderPathSegment,
      label: branch.label,
    })
  })
})
