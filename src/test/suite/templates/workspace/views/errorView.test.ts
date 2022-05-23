import { expect } from 'chai';
import { errorView } from '../../../../../templates/workspace/views/errorView';
import { getMockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > View: errorView()', () => {
  const mockRenderVars = getMockRenderVars();

  test('Renders as expected', () => {
    const result = errorView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="view error"');
    expect(result).contains('class="view__message-title"');
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>');
    expect(result).contains('An unknown error occured');
  });

  test('Renders FETCH error message', () => {
    const result = errorView(getMockState({ error: 'FETCH' }), mockRenderVars);
    expect(result).contains('An error occured whilst collecting workspace files');
  });
});
