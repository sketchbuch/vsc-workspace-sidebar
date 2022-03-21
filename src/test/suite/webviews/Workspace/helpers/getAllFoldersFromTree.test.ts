import { expect } from 'chai';
import { getAllFoldersFromTree } from '../../../../../webviews/Workspace/helpers/getAllFoldersFromTree';
import { mockFileTree, mockFileTreeFolders } from '../../../../mocks/mockFileTree';

suite('Webviews > Workspace > Helpers > getAllFoldersFromTree():', () => {
  test('Returns expected folder list', () => {
    const result = getAllFoldersFromTree(mockFileTree);
    expect(result).to.eql(mockFileTreeFolders);
  });
});
