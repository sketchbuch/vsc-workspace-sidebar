import { expect } from 'chai'
import * as path from 'path'
import { Files } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { convertWsFiles } from '../../../../../webviews/Workspace/helpers/convertWsFiles'

suite('Webviews > Workspace > Helpers > convertWsFiles():', () => {
  const FILE_NAME1 = 'First Project'
  const FILE_NAME2 = 'Second_WORK-Space'
  const FILE1 = `${FILE_NAME1}.code-workspace`
  const FILE_PATH2 = path.join('some', 'folder')
  const FILE2 = path.join(FILE_PATH2, `${FILE_NAME2}.code-workspace`)
  const files = [FILE1, 'Wrong.ext', FILE2]

  const expected: Files = [
    {
      cleanedLabel: 'First Project',
      file: FILE1,
      isSelected: false,
      label: FILE_NAME1,
      path: '',
      showPath: true,
    },
    {
      cleanedLabel: 'Second Work Space',
      file: FILE2,
      isSelected: false,
      label: FILE_NAME2,
      path: FILE_PATH2,
      showPath: true,
    },
  ]

  test('Returns an empty array if no files', () => {
    expect(convertWsFiles([], '')).to.eql([])
  })

  test('Returns expected array if there are files', () => {
    expect(convertWsFiles(files, '')).to.eql(expected)
  })

  test('Converts the files without cleaning the labels', () => {
    const expectedUncleaned: Files = [
      { ...expected[0], label: FILE_NAME1 },
      { ...expected[1], label: FILE_NAME2 },
    ]
    expect(convertWsFiles(files, '')).to.eql(expectedUncleaned)
  })
})
