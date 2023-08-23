import { expect } from 'chai';
import * as path from 'path';
import { isTreeFolderCompacted } from '../../../../../webviews/Workspace/helpers/isTreeFolderCompacted';

suite('Webviews > Workspace > Helpers > isTreeFolderCompacted():', () => {
  test('Returns false if file label does not contain path.sep', () => {
    const result = isTreeFolderCompacted({
      files: [],
      folderPath: 'test',
      isRoot: true,
      label: 'test',
      sub: [],
    });
    expect(result).to.equal(false);
  });

  test('Returns true if file label contains path.sep', () => {
    const result = isTreeFolderCompacted({
      files: [],
      folderPath: 'test',
      isRoot: true,
      label: `test${path.sep}test`,
      sub: [],
    });
    expect(result).to.equal(true);
  });
});
