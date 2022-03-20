import { expect } from 'chai';
import { t } from 'vscode-ext-localisation';
import { loadingView } from '../../../../../templates/workspace';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > View: loadingView()', () => {
  test('Renders as expected', () => {
    const result = loadingView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="view loading"')).to.equal(true);
    expect(result.includes('class="view__message-title"')).to.equal(true);
    expect(
      result.includes(
        '<span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>'
      )
    ).to.equal(true);
    expect(result.includes(t('webViews.workspace.loading'))).to.equal(true);
  });
});
