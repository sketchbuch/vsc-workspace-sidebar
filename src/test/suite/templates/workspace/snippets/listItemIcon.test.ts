import { expect } from 'chai';
import * as sinon from 'sinon';
import * as icons from '../../../../../templates/getImgUrls';
import { listItemIcon } from '../../../../../templates/workspace/snippets/listItemIcon';
import { mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: listItemIcon()', () => {
  test('Renders correctly', () => {
    const spy = sinon.spy(icons, 'getImgUrls');
    const result = listItemIcon(mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="view__icon list__icon"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="dark"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="light"')).to.equal(true);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockRenderVars, 'success');
    spy.restore();
  });
});
