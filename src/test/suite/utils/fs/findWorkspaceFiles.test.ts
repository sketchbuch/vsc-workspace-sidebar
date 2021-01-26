import { expect } from 'chai';
import * as mockFs from 'mock-fs';
import * as path from 'path';
import { findWorkspaceFiles } from '../../../../utils';
import { mockFsStructure } from '../../../mocks';

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

    return findWorkspaceFiles(FOLDER, 1).then((wsFiles) => {
      expect(wsFiles).to.eql([
        path.join(FOLDER, 'WS 0.code-workspace'),
        path.join(FOLDER, 'test-subfolder1', 'WS 1.code-workspace'),
        path.join(FOLDER, 'test-subfolder2', 'WS 2.code-workspace'),
      ]);
    });
  });
});
