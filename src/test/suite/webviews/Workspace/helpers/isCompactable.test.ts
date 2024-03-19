import { expect } from 'chai'
import * as path from 'path'
import { isCompactable } from '../../../../../webviews/Workspace/helpers/isCompactable'
import { file1 } from '../../../../mocks/mockFileData'

suite('Webviews > Workspace > Helpers > isCompactable():', () => {
  test('Returns true if there are no files and one sub', () => {
    const result = isCompactable({
      compactedFolders: [],
      files: [],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: 'test',
      sub: [
        {
          compactedFolders: [],
          files: [],
          folderPath: '',
          folderPathSegment: 'sub',
          isRoot: true,
          label: 'sub',
          sub: [],
        },
      ],
    })
    expect(result).to.equal(true)
  })

  test('Returns false if there are 0 subs', () => {
    const result = isCompactable({
      compactedFolders: [],
      files: [],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: `test${path.sep}test`,
      sub: [],
    })
    expect(result).to.equal(false)
  })

  test('Returns false if there are 2 or more subs', () => {
    const result = isCompactable({
      compactedFolders: [],
      files: [],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: `test${path.sep}test`,
      sub: [
        {
          compactedFolders: [],
          files: [],
          folderPath: '',
          folderPathSegment: 'sub1',
          isRoot: true,
          label: 'sub1',
          sub: [],
        },
        {
          compactedFolders: [],
          files: [],
          folderPath: '',
          folderPathSegment: 'sub2',
          isRoot: true,
          label: 'sub2',
          sub: [],
        },
      ],
    })
    expect(result).to.equal(false)
  })

  test('Returns false if there are files', () => {
    const result = isCompactable({
      compactedFolders: [],
      files: [file1],
      folderPath: '',
      folderPathSegment: 'test',
      isRoot: true,
      label: `test${path.sep}test`,
      sub: [
        {
          compactedFolders: [],
          files: [],
          folderPath: '',
          folderPathSegment: 'sub',
          isRoot: true,
          label: 'sub',
          sub: [],
        },
      ],
    })
    expect(result).to.equal(false)
  })
})
