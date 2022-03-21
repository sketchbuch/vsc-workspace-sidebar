import { expect } from 'chai';
import { loadingView } from '../../../../../templates/workspace/views/loadingView';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > View: loadingView()', () => {
  test('Renders as expected', () => {
    const result = loadingView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="view loading"');
    expect(result).contains('class="view__message-title"');
    expect(result).contains(
      '<span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>'
    );
    expect(result).contains('Collecting workspaces...');
  });
});
