import { expect } from 'chai';
import { sortFilesByLabel } from '../../../../utils';

suite('Utils > sortFilesByLabel()', () => {
  const fileA = {
    file: '/a/file/to/compare-1.txt',
    isSelected: false,
    label: 'File A',
    path: '/a/file/to',
  };
  const fileB = {
    file: '/a/file/to/compare-2.txt',
    isSelected: false,
    label: 'File B',
    path: '/a/file/to',
  };

  test('Returns -1 if A is less than B', () => {
    expect(sortFilesByLabel(fileA, fileB)).to.equal(-1);
  });

  test('Returns 1 if A is less than B', () => {
    expect(sortFilesByLabel(fileB, fileA)).to.equal(1);
  });

  test('Returns 0 if A is the same as B', () => {
    expect(sortFilesByLabel(fileA, fileA)).to.equal(0);
  });
});
