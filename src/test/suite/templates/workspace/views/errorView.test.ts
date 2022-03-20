import { expect } from 'chai';
import { t } from 'vscode-ext-localisation';
import { errorView } from '../../../../../templates/workspace';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > View: errorView()', () => {
  test('Renders as expected', () => {
    const result = errorView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="view error"')).to.equal(true);
    expect(result.includes('class="view__message-title"')).to.equal(true);
    expect(
      result.includes('<span class="view__message-icon codicon codicon-error"></span>')
    ).to.equal(true);
    expect(result.includes(t('webViews.workspace.error'))).to.equal(true);
  });

  test('Renders FETCH error message', () => {
    const result = errorView(getMockState({ error: 'FETCH' }), mockRenderVars);
    expect(result.includes(t('webViews.workspace.error-fetch'))).to.equal(true);
  });
});
