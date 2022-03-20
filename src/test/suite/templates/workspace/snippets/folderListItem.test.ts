import { expect } from 'chai';
import { folderListItem } from '../../../../../templates/workspace/snippets/folderListItem';
import { getMockWorkspaceFolders } from '../../../../mocks/mockWorkspaceFolders';

suite('Templates > Workspace > Snippets: folderListItem()', () => {
  const folder = getMockWorkspaceFolders(1)[0];

  test('Renders folder item', () => {
    const result = folderListItem(folder);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result).contains(folder.name);
    expect(result).contains(folder.uri.fsPath);
  });
});
