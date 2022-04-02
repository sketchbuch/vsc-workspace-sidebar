import { expect } from 'chai';
import mockFs from 'mock-fs';
import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { FS_WS_FILETYPE } from '../../../../constants/fs';
import * as utils from '../../../../utils/fs/collectFilesFromFolder';
import { findWorkspaceFiles } from '../../../../utils/fs/findWorkspaceFiles';
import { mockFsStructure } from '../../../mocks/mockFsStructure';

suite('Utils > Fs -> findWorkspaceFiles()', () => {
  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  test('Empty array is returned if the folder is not a folder', () => {
    const stub = sinon.stub(vscode.workspace, 'getConfiguration');

    stub.returns({
      get: (config: string): string | number => {
        if (config === 'workspaceSidebar.depth') {
          return 1;
        }

        return 'nonexistent-test-folder';
      },
    } as vscode.WorkspaceConfiguration);
    return findWorkspaceFiles().then((wsFiles) => {
      expect(wsFiles).to.eql([]);

      stub.restore();
    });
  });

  test('File paths array is returned if the folder contains files of correct type', () => {
    const FOLDER = 'find-workspace-files';
    const stub = sinon.stub(vscode.workspace, 'getConfiguration');
    const spy = sinon.spy(utils, 'collectFilesFromFolder');

    stub.returns({
      get: (config: string): string | number => {
        if (config === 'workspaceSidebar.depth') {
          return 1;
        }

        return FOLDER;
      },
    } as vscode.WorkspaceConfiguration);

    return findWorkspaceFiles().then((wsFiles) => {
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
      stub.restore();
    });
  });
});
