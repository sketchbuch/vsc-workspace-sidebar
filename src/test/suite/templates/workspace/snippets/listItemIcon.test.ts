import { expect } from 'chai';
import * as sinon from 'sinon';
import * as icons from '../../../../../templates/getImgUrls';
import { listItemIcon } from '../../../../../templates/workspace/snippets/listItemIcon';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';

suite('Templates > Workspace > Snippets: listItemIcon()', () => {
  test('Renders correctly', () => {
    const spy = sinon.spy(icons, 'getImgUrls');

    const result = listItemIcon(mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="view__icon list__icon"');
    expect(result).contains('<img alt="" data-theme="dark"');
    expect(result).contains('<img alt="" data-theme="light"');

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockRenderVars, 'check');

    spy.restore();
  });
});
