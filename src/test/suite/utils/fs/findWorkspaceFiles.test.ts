/* import { expect } from 'chai';
import * as mockFs from 'mock-fs';
import * as path from 'path';
import { FS_WS_FILETYPE } from '../../../../constants';
import { findWorkspaceFiles } from '../../../../utils';
import * as utils from '../../../../utils/fs/collectFilesFromFolder';
import { mockFsStructure } from '../../../mocks';
import sinon = require('sinon');

suite('Utils > findWorkspaceFiles()', () => {
  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  test('false is returned if the folder is not a folder', () => {
    return findWorkspaceFiles('nonexistent-test-folder', 1).then((wsFiles) => {
      expect(wsFiles).to.equal(false);
    });
  });

  test('File paths array is returned if the folder contains files of correct type', () => {
    const FOLDER = 'find-workspace-files';
    const spy = sinon.spy(utils, 'collectFilesFromFolder');

    return findWorkspaceFiles(FOLDER, 1).then((wsFiles) => {
      expect(wsFiles).to.eql([
        path.join(FOLDER, 'WS 0.code-workspace'),
        path.join(FOLDER, 'test-subfolder1', 'WS 1.code-workspace'),
        path.join(FOLDER, 'test-subfolder2', 'WS 2.code-workspace'),
      ]);

      sinon.assert.callCount(spy, 3); // Initial + 2 subfolders
      sinon.assert.calledWith(spy, FOLDER, FS_WS_FILETYPE, 1, 0);
      sinon.assert.calledWith(spy, path.join(FOLDER, 'test-subfolder1'), FS_WS_FILETYPE, 1, 1);
      sinon.assert.calledWith(spy, path.join(FOLDER, 'test-subfolder2'), FS_WS_FILETYPE, 1, 1);

      spy.restore();
    });
  });
});
 */
