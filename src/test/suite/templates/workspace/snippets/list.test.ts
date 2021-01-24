import { expect } from 'chai';
import * as sinon from 'sinon';
import { list } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/listItem';

suite('Templates > Workspace > Snippets: list()', () => {
  test('Renders correctly if there are no files', () => {
    const result = list([]);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are files', () => {
    const spy = sinon.spy(snippets, 'listItem');
    const result = list(['one', 'two']);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    sinon.assert.calledTwice(spy);
    expect(spy.getCalls()[0].args[0]).to.eql({ file: 'one', label: 'One', path: '' });
    expect(spy.getCalls()[1].args[0]).to.eql({ file: 'two', label: 'Two', path: '' });

    spy.restore();
  });
});
