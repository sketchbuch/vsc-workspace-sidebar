import { expect } from 'chai'
import { sortFilesByProp } from '../../../../utils/arrays/sortFilesByProp'
import { File } from '../../../../webviews/Workspace/WorkspaceViewProvider.interface'

suite('Utils > Arrays > sortFilesByProp()', () => {
  const PROP = 'label'
  const fileA: File = {
    cleanedLabel: 'File A',
    file: '/a/file/to/compare-1.txt',
    isSelected: false,
    label: 'File A',
    path: '/a/file/to',
    showPath: false,
  }
  const fileB: File = {
    cleanedLabel: 'File B',
    file: '/a/file/to/compare-2.txt',
    isSelected: false,
    label: 'File B',
    path: '/a/file/to',
    showPath: false,
  }

  test(`Returns -1 if A.${PROP} is less than B.${PROP}`, () => {
    expect(sortFilesByProp(PROP)(fileA, fileB)).to.equal(-1)
  })

  test(`Returns 1 if A.${PROP} is less than B.${PROP}`, () => {
    expect(sortFilesByProp(PROP)(fileB, fileA)).to.equal(1)
  })

  test(`Returns 0 if A.${PROP} is the same as B.${PROP}`, () => {
    expect(sortFilesByProp(PROP)(fileA, fileA)).to.equal(0)
  })
})
