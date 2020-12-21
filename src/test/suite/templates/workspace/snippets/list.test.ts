import { expect } from 'chai';
import { list } from '../../../../../templates/workspace';

suite('Workspace: list()', () => {
  test('Renders correctly if there are no files', () => {
    const result = list([]);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are files', () => {
    const result = list(['one', 'two']);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });
});
