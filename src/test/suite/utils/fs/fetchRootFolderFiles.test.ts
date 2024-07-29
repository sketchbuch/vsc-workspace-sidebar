// MockFS seems broken

/* import { expect } from 'chai'
import mockFs from 'mock-fs'
import os from 'os'
import * as path from 'path'
import * as sinon from 'sinon'
import * as folders from '../../../../config/folders'
import { CONFIG_EXCLUDE_HIDDEN_FODLERS } from '../../../../constants/config'
import { findAllRootFolderFiles } from '../../../../utils/fs/findAllRootFolderFiles'
import { OS_HOMEFOLDER } from '../../../mocks/mockFileData'
import { mockFsStructure } from '../../../mocks/mockFsStructure'

suite('Utils > Fs > findAllRootFolderFiles()', async () => {
  const DEPTH = 2

  let excludedFoldersConfigStub: sinon.SinonStub
  let foldersConfigStub: sinon.SinonStub
  let hiddenFoldersConfigStub: sinon.SinonStub
  let osStub: sinon.SinonStub

  setup(() => {
    mockFs(mockFsStructure)

    excludedFoldersConfigStub = sinon.stub(folders, 'getExcludedFoldersConfig').callsFake(() => [])
    foldersConfigStub = sinon.stub(folders, 'getFoldersConfig').callsFake(() => [])
    hiddenFoldersConfigStub = sinon
      .stub(folders, 'getExcludeHiddenFoldersConfig')
      .callsFake(() => CONFIG_EXCLUDE_HIDDEN_FODLERS)
    osStub = sinon.stub(os, 'homedir').callsFake(() => OS_HOMEFOLDER)
  })

  teardown(() => {
    mockFs.restore()

    excludedFoldersConfigStub.restore()
    foldersConfigStub.restore()
    hiddenFoldersConfigStub.restore()
    osStub.restore()
  })

  test('Result is "no-root-folders" if there are no root folders', async () => {
    foldersConfigStub.callsFake(() => [])

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({ rootFolders: [], result: 'no-root-folders' })
  })

  test('Result is "nonexistent" if all root folders are neither files nor folders', async () => {
    const paths = [
      { path: path.join('madeup', 'folder'), depth: DEPTH },
      { path: path.join('another', 'madeup', 'folder'), depth: DEPTH },
    ]
    foldersConfigStub.callsFake(() => paths)

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({
      rootFolders: [
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[0].path,
          result: 'nonexistent',
        },
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[1].path,
          result: 'nonexistent',
        },
      ],
      result: 'nonexistent',
    })
  })

  test('Result is "is-file" if all root folders are files', async () => {
    const paths = [
      { path: path.join('collect-files-from-folder', 'file-1.code-workspace'), depth: DEPTH },
      { path: path.join('check-file', 'test-file.code-workspace'), depth: DEPTH },
    ]
    foldersConfigStub.callsFake(() => paths)

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({
      rootFolders: [
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[0].path,
          result: 'is-file',
        },
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[1].path,
          result: 'is-file',
        },
      ],
      result: 'is-file',
    })
  })

  test('Result is "no-workspaces" if all root folders contain no workspaces', async () => {
    const paths = [
      { path: path.join('find-workspace-files', 'no-workspaces'), depth: DEPTH },
      { path: path.join('find-workspace-files', 'no-workspaces2'), depth: DEPTH },
    ]
    foldersConfigStub.callsFake(() => paths)

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({
      rootFolders: [
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[0].path,
          result: 'no-workspaces',
        },
        {
          depth: DEPTH,
          files: [],
          folderPath: paths[1].path,
          result: 'no-workspaces',
        },
      ],
      result: 'no-workspaces',
    })
  })

  test('Result is "ok" if all root folders contain workspaces', async () => {
    const paths = [
      { path: path.join('find-workspace-files'), depth: DEPTH },
      { path: path.join('find-workspace-files-more-workspaces'), depth: DEPTH },
    ]
    foldersConfigStub.callsFake(() => paths)

    const result = await findAllRootFolderFiles()
    expect(result).to.eql({
      rootFolders: [
        {
          depth: DEPTH,
          files: [
            path.join(paths[0].path, 'WS 0.code-workspace'),
            path.join(paths[0].path, 'test-subfolder1', 'WS 1.code-workspace'),
            path.join(paths[0].path, 'test-subfolder2', 'WS 2.code-workspace'),
          ],
          folderPath: paths[0].path,
          result: 'ok',
        },
        {
          depth: DEPTH,
          files: [path.join(paths[1].path, 'more-sub', 'WS 7.code-workspace')],
          folderPath: paths[1].path,
          result: 'ok',
        },
      ],
      result: 'ok',
    })
  })
})
 */
