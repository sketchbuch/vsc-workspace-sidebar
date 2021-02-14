import { expect } from 'chai';
import { findDuplicates } from '../../../../utils';

suite('Utils > findDuplicates()', () => {
  test('Returns an array containing duplicate values', () => {
    expect(findDuplicates(['VSCode', 'Flutter', 'React', 'Flutter', 'JS', 'React'])).to.eql([
      'Flutter',
      'React',
    ]);
  });
});
