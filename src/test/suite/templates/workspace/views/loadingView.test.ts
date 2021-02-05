import { expect } from 'chai';
import { t } from 'vscode-ext-localisation';
import { loadingView } from '../../../../../templates/workspace';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > View: loadingView()', () => {
  test('Renders as expected', () => {
    const result = loadingView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="view loading"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="dark"')).to.equal(true);
    expect(result.includes('<img alt="" data-theme="light"')).to.equal(true);
    expect(result.includes('class="view__message-title"')).to.equal(true);
    expect(result.includes(t('webViews.workspace.loading'))).to.equal(true);
  });
});
