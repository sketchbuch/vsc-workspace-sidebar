import { expect } from 'chai';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import { mockFilesForFileTree, mockFileTree } from '../../../../mocks/mockFileTree';

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  test('Returns expected filetree', () => {
    const result = getFileTree(mockFilesForFileTree);
    expect(result).to.eql(mockFileTree);
  });
});
