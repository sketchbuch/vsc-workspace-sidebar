import { expect } from 'chai';
import { getFileTree } from '../../../../webviews/Workspace/helpers/getFileTree';
import {
  mockFilesForFileTree,
  mockFileTree,
  mockFileTreeNoFiles,
} from '../../../mocks/mockFileTree';

suite('Webviews > Workspace > getFileTree():', () => {
  test('Returns expected filetree', () => {
    const result = getFileTree(mockFilesForFileTree);
    expect(result).to.eql(mockFileTree);
  });

  test('Returns expected filetree without files if includeFiles: "false"', () => {
    const result = getFileTree(mockFilesForFileTree, false);
    expect(result).to.eql(mockFileTreeNoFiles);
  });
});
