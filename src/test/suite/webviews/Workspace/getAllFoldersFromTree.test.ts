import { expect } from 'chai';
import { getAllFoldersFromTree } from '../../../../webviews/Workspace/helpers/getAllFoldersFromTree';
import { mockFileTree, mockFileTreeFolders } from '../../../mocks/mockFileTree';

suite('Webviews > Workspace > getAllFoldersFromTree():', () => {
  test('Returns expected folder list', () => {
    const result = getAllFoldersFromTree(mockFileTree);
    expect(result).to.eql(mockFileTreeFolders);
  });
});
