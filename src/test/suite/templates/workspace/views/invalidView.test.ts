import { expect } from 'chai';
import * as sinon from 'sinon';
import { t } from 'vscode-ext-localisation';
import * as settings from '../../../../../templates/common/snippets/settingsLink';
import { invalidView } from '../../../../../templates/workspace';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > View: invalidView()', () => {
  test('Renders as expected', () => {
    const spy = sinon.spy(settings, 'settingsLink');
    const result = invalidView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="view invalid"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="dark"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="light"')).to.equal(true);
    expect(result.includes('class="view__message-title"')).to.equal(true);
    expect(result.includes(t('webViews.workspace.inValid'))).to.equal(true);

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });
});
