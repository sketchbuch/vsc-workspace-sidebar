/* import { expect } from 'chai';
import * as vscode from 'vscode';
import { FS_WS_FILETYPE } from '../../../../../constants';
import { listItem } from '../../../../../templates/workspace';

suite('Templates > Workspace > Snippets: listItem()', () => {
  const imgDarkFolderUri = {
    scheme: 'file',
    authority: 'localhost',
    path: '/resources/imgages/dark',
  } as vscode.Uri;
  const imgLightFolderUri = {
    scheme: 'file',
    authority: 'localhost',
    path: '/resources/imgages/light',
  } as vscode.Uri;

  test('Renders correctly if there are no files', () => {
    const file = {
      file: 'file-1',
      isSelected: false,
      label: 'File 1',
      path: `/some/folder/file-1.${FS_WS_FILETYPE}`,
    };
    const result = listItem(file, imgDarkFolderUri, imgLightFolderUri);

    expect(result).to.be.a('string');
    expect(result).to.include(file.path);
    expect(result).to.include(file.label);
  });
});
 */
