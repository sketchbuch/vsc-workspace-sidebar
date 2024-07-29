import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as path from 'path'
import { FS_WS_FILETYPE } from '../../../../constants/fs'
import { collectFilesFromFolder } from '../../../../utils/fs/collectFilesFromFolder'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

// MockFS seems broken
suite.skip('Utils > Fs > collectFilesFromFolder()', () => {
  const FOLDER = 'collect-files-from-folder'
  const MAX_DEPTH = 1

  suiteSetup(() => {
    mockFs(mockFsStructure)
  })

  suiteTeardown(() => {
    mockFs.restore()
  })

  test('Should return an array with one file if max depth is 0', async () => {
    const wsFiles = await collectFilesFromFolder({
      curDepth: 0,
      excludedFolders: [],
      excludeHiddenFolders: true,
      fileType: FS_WS_FILETYPE,
      folder: FOLDER,
      maxDepth: 0,
    })

    expect(wsFiles).to.have.length(1)
    expect(wsFiles[0]).contains(`file-1.${FS_WS_FILETYPE}`)
  })

  test('Should return an array with four files if max depth allows searching subfolders', async () => {
    const wsFiles = await collectFilesFromFolder({
      curDepth: 0,
      excludedFolders: [],
      excludeHiddenFolders: true,
      fileType: FS_WS_FILETYPE,
      folder: FOLDER,
      maxDepth: MAX_DEPTH,
    })

    expect(wsFiles).to.have.length(4)
    expect(wsFiles[0]).contains(`file-1.${FS_WS_FILETYPE}`)
    expect(wsFiles[1]).contains(`file-2.${FS_WS_FILETYPE}`)
    expect(wsFiles[2]).contains(`file-3.${FS_WS_FILETYPE}`)
    expect(wsFiles[3]).contains(`file-7.${FS_WS_FILETYPE}`)
  })

  test('Should return an empty array if the folder is in the excluded folders config', async () => {
    const wsFiles = await collectFilesFromFolder({
      curDepth: 0,
      excludedFolders: ['hidden-last-folder'],
      excludeHiddenFolders: true,
      fileType: FS_WS_FILETYPE,
      folder: path.join(FOLDER, 'hidden-last-folder'),
      maxDepth: MAX_DEPTH,
    })

    expect(wsFiles).to.have.length(0)
  })

  suite('Hidden Files and Folders', () => {
    test('Hidden folders are ignored in the last part of root folder paths', async () => {
      const wsFiles = await collectFilesFromFolder({
        curDepth: 0,
        excludedFolders: [],
        excludeHiddenFolders: true,
        fileType: FS_WS_FILETYPE,
        folder: path.join(FOLDER, 'hidden-last-folder', '.hiddenfolder'),
        maxDepth: 2,
      })

      expect(wsFiles).to.have.length(1)
      expect(wsFiles[0]).contains('hiddenfolder.code-workspace')
    })

    test('Hidden folders are ignored in the middle of root folder paths', async () => {
      const wsFiles = await collectFilesFromFolder({
        curDepth: 0,
        excludedFolders: [],
        excludeHiddenFolders: true,
        fileType: FS_WS_FILETYPE,
        folder: path.join(FOLDER, 'hidden-sub-folder', '.hiddenfolder', 'sub-folder'),
        maxDepth: 3,
      })

      expect(wsFiles).to.have.length(1)
      expect(wsFiles[0]).contains('hiddensubfolder.code-workspace')
    })

    test('Hidden subfolders are ignored', async () => {
      const wsFiles = await collectFilesFromFolder({
        curDepth: 0,
        excludedFolders: [],
        excludeHiddenFolders: true,
        fileType: FS_WS_FILETYPE,
        folder: path.join(FOLDER, 'hidden-last-folder'),
        maxDepth: MAX_DEPTH,
      })

      expect(wsFiles).to.have.length(0)
    })
  })
})
