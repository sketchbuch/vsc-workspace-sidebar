import { expect } from 'chai';
import * as sinon from 'sinon';
import * as settings from '../../../../../templates/common/snippets/settingsLink';
import { listView } from '../../../../../templates/workspace';
import * as list from '../../../../../templates/workspace/snippets/list';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > View: listView()', () => {
  test('Renders correctly if files is false', () => {
    const result = listView(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are no files', () => {
    const mockState = getMockState({ files: [] });
    const spy = sinon.spy(settings, 'settingsLink');
    const result = listView(mockState, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result.includes('class="view list list--empty"')).to.equal(true);
    expect(result).not.to.equal('');

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });

  test('Renders correctly if there are files', () => {
    const mockState = getMockState({ files: ['/a/path/to/a-file'] });
    const spy = sinon.spy(list, 'list');
    const result = listView(mockState, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result.includes('class="view list"')).to.equal(true);
    expect(result).not.to.equal('');

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockState, mockRenderVars);
    spy.restore();
  });
});
