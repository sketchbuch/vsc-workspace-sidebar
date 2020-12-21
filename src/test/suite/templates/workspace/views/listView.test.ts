import { expect } from 'chai';
import * as sinon from 'sinon';
import { listView } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/list';

suite('Workspace: listView()', () => {
  test('Renders correctly if there are no files', () => {
    const result = listView(false);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are files', () => {
    const spy = sinon.spy(snippets, 'list');
    const result = listView([]);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, []);

    spy.restore();
  });
});
