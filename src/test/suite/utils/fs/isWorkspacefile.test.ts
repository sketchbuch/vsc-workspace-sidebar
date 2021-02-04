import { expect } from 'chai';
import { FS_WS_FILETYPE } from '../../../../constants';
import { isWorkspacefile } from '../../../../utils';

suite('Utils > isWorkspacefile()', () => {
  test('Returns false if the schema is not "file"', () => {
    expect(isWorkspacefile(`/a/file/test.${FS_WS_FILETYPE}`, 'something')).to.equal(false);
  });

  test('Returns false if the file is not workspace file', () => {
    expect(isWorkspacefile(`/a/file/test.txt`, 'file')).to.equal(false);
  });

  test('Returns true if the schema is "file" and the file is a workspace file', () => {
    expect(isWorkspacefile(`/a/file/test.${FS_WS_FILETYPE}`, 'file')).to.equal(true);
  });
});
