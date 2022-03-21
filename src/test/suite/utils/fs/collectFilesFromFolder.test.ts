import { expect } from 'chai';
import mockFs from 'mock-fs';
import { collectFilesFromFolder } from '../../../../utils/fs/collectFilesFromFolder';
import * as fn from '../../../../utils/fs/getFilenamesOfType';
import * as hidden from '../../../../utils/fs/isHiddenFile';
import { mockFsStructure } from '../../../mocks/mockFsStructure';
import sinon = require('sinon');

suite('Utils > Fs -> collectFilesFromFolder()', () => {
  const FOLDER = 'collect-files-from-folder';
  const FILE_TYPE = 'txt';
  const MAX_DEPTH = 1;

  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  test('Should return an array with one file if max depth is 0', () => {
    const hiddenSpy = sinon.spy(hidden, 'isHiddenFile');
    const fnSpy = sinon.spy(fn, 'getFilenamesOfType');

    collectFilesFromFolder(FOLDER, FILE_TYPE, 0, 0).then((wsFiles) => {
      expect(wsFiles).to.have.length(1);
      expect(wsFiles).contains('file-1.txt');

      sinon.assert.callCount(hiddenSpy, 1);
      sinon.assert.callCount(fnSpy, 2);

      hiddenSpy.restore();
      fnSpy.restore();
    });
  });

  test('Should return an array with four files if max depth allows searching subfolders', () => {
    collectFilesFromFolder(FOLDER, FILE_TYPE, MAX_DEPTH, 0).then((wsFiles) => {
      const hiddenSpy = sinon.spy(hidden, 'isHiddenFile');
      const fnSpy = sinon.spy(fn, 'getFilenamesOfType');

      expect(wsFiles).to.have.length(4);
      expect(wsFiles).contains('file-1.txt');
      expect(wsFiles).contains('file-2.txt');
      expect(wsFiles).contains('file-3.txt');
      expect(wsFiles).contains('file-7.txt');

      sinon.assert.callCount(hiddenSpy, 3);
      sinon.assert.callCount(fnSpy, 6);

      hiddenSpy.restore();
      fnSpy.restore();
    });
  });
});
