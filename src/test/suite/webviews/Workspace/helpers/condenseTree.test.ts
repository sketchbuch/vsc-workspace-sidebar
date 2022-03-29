import { expect } from 'chai';
import { condenseTree } from '../../../../../webviews/Workspace/helpers/condenseTree';
import { mockCondensedFileTree, mockFileTree } from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > condenseTree():', () => {
  test('Returns the expected condensed filetree', () => {
    const result = condenseTree(mockFileTree);
    expect(result).to.eql(mockCondensedFileTree);
  });
});
