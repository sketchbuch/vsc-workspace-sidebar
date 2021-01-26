import { expect } from 'chai';
import * as mockFs from 'mock-fs';
import * as path from 'path';
import { getFilenamesOfType } from '../../../../utils';
import { mockFsStructure } from '../../../mocks';

suite('Utils > getFilenamesOfType()', () => {
  const FILE_TYPE = 'txt';
  const FOLDER = 'get-filenames-of-type';

  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  test('An empty array is returned if there are no filenames', () => {
    expect(getFilenamesOfType('folders', [], '/test', FILE_TYPE)).to.eql([]);
  });

  test('An array of folders is returned if there are folders in filenames', () => {
    expect(
      getFilenamesOfType(
        'folders',
        ['test-subfolder1', 'test-subfolder2', 'test-subfolder3'],
        FOLDER,
        FILE_TYPE
      )
    ).to.eql([path.join(FOLDER, 'test-subfolder1'), path.join(FOLDER, 'test-subfolder2')]);
  });

  test('An array of files is returned if there are files in filenames matching the fileType', () => {
    expect(
      getFilenamesOfType(
        'files',
        ['test-file.txt', 'test-file2.jpg', 'test-file3'],
        FOLDER,
        FILE_TYPE
      )
    ).to.eql([path.join(FOLDER, 'test-file.txt')]);
  });
});
