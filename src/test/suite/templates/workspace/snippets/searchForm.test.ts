import { expect } from 'chai';
import * as sinon from 'sinon';
import { searchForm } from '../../../../../templates/workspace';
import * as templates from '../../../../../templates/workspace/snippets/searchBox';
import { getMockState } from '../../../../mocks';

suite('Templates > Workspace > Snippets: searchForm()', () => {
  test('Renders nothing if !showSearch', () => {
    const result = searchForm(getMockState(), false);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders the form if showSearch', () => {
    const spy = sinon.spy(templates, 'searchBox');
    const mockState = getMockState();
    const result = searchForm(mockState, true);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result.includes('class="list__search"')).to.equal(true);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockState);
    spy.restore();
  });
});
