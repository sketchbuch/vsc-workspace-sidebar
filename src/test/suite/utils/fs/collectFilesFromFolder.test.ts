import { expect } from 'chai';
import mockFs from 'mock-fs';
import { collectFilesFromFolder } from '../../../../utils/fs/collectFilesFromFolder';
import { mockFsStructure } from '../../../mocks/mockFsStructure';

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

  test('Should return an array with one file if max depth is 0', async () => {
    const wsFiles = await collectFilesFromFolder(FOLDER, FILE_TYPE, 0, 0);

    expect(wsFiles).to.have.length(1);
    expect(wsFiles[0]).contains('file-1.txt');
  });

  test('Should return an array with four files if max depth allows searching subfolders', async () => {
    const wsFiles = await collectFilesFromFolder(FOLDER, FILE_TYPE, MAX_DEPTH, 0);

    expect(wsFiles).to.have.length(4);
    expect(wsFiles[0]).contains('file-1.txt');
    expect(wsFiles[1]).contains('file-2.txt');
    expect(wsFiles[2]).contains('file-3.txt');
    expect(wsFiles[3]).contains('file-7.txt');
  });
});
