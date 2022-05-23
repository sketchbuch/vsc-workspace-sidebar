import { expect } from 'chai';
import * as sinon from 'sinon';
import * as settings from '../../../../../templates/common/snippets/settingsLink';
import { invalidView } from '../../../../../templates/workspace/views/invalidView';
import { getMockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > View: invalidView()', () => {
  const mockRenderVars = getMockRenderVars();

  test('Renders as expected', () => {
    const spy = sinon.spy(settings, 'settingsLink');
    const result = invalidView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="view invalid"');
    expect(result).contains('class="view__message-title"');
    expect(result).contains('<span class="view__message-icon codicon codicon-error"></span>');
    expect(result).contains('Folder path is not a directory');

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });
});
