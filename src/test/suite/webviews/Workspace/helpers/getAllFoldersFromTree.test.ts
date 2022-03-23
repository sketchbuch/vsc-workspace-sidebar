import { expect } from 'chai';
import { getAllFoldersFromTree } from '../../../../../webviews/Workspace/helpers/getAllFoldersFromTree';
import { mockFileTree, mockFolderList } from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getAllFoldersFromTree():', () => {
  test('Returns expected folder list', () => {
    const result = getAllFoldersFromTree(mockFileTree);
    expect(result).to.eql(mockFolderList);
  });
});
