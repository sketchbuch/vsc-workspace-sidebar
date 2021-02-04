import { expect } from 'chai';
import { capitalise } from '../../../../utils/';

suite('Utils > capitalise()', () => {
  test('Returns the string with the first letter capitalised', () => {
    expect(capitalise('test')).to.equal('Test');
  });
});
