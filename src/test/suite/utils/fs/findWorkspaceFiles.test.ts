import { expect } from 'chai';
import mockFs from 'mock-fs';
import * as path from 'path';
import * as sinon from 'sinon';
import * as configs from '../../../../config/getConfig';
import { FS_WS_FILETYPE } from '../../../../constants/fs';
import * as utils from '../../../../utils/fs/collectFilesFromFolder';
import { findWorkspaceFiles } from '../../../../utils/fs/findWorkspaceFiles';
import { mockFsStructure } from '../../../mocks/mockFsStructure';

suite('Utils > Fs > findWorkspaceFiles()', () => {
  const FOLDER = 'find-workspace-files';

  let configFolderStub: sinon.SinonStub;
  let configDepthStub: sinon.SinonStub;

  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  setup(() => {
    configFolderStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => FOLDER);
    configDepthStub = sinon.stub(configs, 'getDepthConfig').callsFake(() => 1);
  });

  teardown(() => {
    configFolderStub.restore();
    configDepthStub.restore();
  });

  test('invalid-folder object is returned if the folder is not a folder', () => {
    configFolderStub.callsFake(() => 'a.file');
    return findWorkspaceFiles().then((wsFiles) => {
      expect(wsFiles).to.eql({ files: [], result: 'invalid-folder' });
    });
  });

  test('no-workspaces object is returned if the folder contains no workspace files', () => {
    configFolderStub.callsFake(() => 'get-filenames-of-type');
    return findWorkspaceFiles().then((wsFiles) => {
      expect(wsFiles).to.eql({ files: [], result: 'no-workspaces' });
    });
  });

  test('valid object is returned if the folder contains files of correct type', () => {
    const collectSpy = sinon.spy(utils, 'collectFilesFromFolder');

    return findWorkspaceFiles().then((wsFiles) => {
      expect(wsFiles).to.eql({
        files: [
          path.join(FOLDER, 'WS 0.code-workspace'),
          path.join(FOLDER, 'test-subfolder1', 'WS 1.code-workspace'),
          path.join(FOLDER, 'test-subfolder2', 'WS 2.code-workspace'),
        ],
        result: 'none',
      });

      sinon.assert.callCount(collectSpy, 3); // Initial + 2 subfolders
      sinon.assert.calledWith(collectSpy, FOLDER, FS_WS_FILETYPE, 1, 0);
      sinon.assert.calledWith(
        collectSpy,
        path.join(FOLDER, 'test-subfolder1'),
        FS_WS_FILETYPE,
        1,
        1
      );
      sinon.assert.calledWith(
        collectSpy,
        path.join(FOLDER, 'test-subfolder2'),
        FS_WS_FILETYPE,
        1,
        1
      );

      collectSpy.restore();
    });
  });
});
