import { expect } from 'chai';
import { FS_WS_FILETYPE } from '../../../../../constants';
import { listItem } from '../../../../../templates/workspace';

suite('Templates > Workspace > Snippets: listItem()', () => {
  test('Renders correctly if there are no files', () => {
    const file = {
      file: 'file-1',
      label: 'File 1',
      path: `/some/folder/file-1.${FS_WS_FILETYPE}`,
      selected: false,
    };
    const result = listItem(file);

    expect(result).to.be.a('string');
    expect(result).to.include(file.path);
    expect(result).to.include(file.label);
  });
});
