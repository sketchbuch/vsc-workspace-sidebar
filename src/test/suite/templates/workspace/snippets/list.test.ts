import { expect } from 'chai';
import * as sinon from 'sinon';
import { list } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/listItem';
import { WorkspaceState } from '../../../../../webviews';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: list()', () => {
  const testRendering = (state: Partial<WorkspaceState>) => {
    const spy = sinon.spy(snippets, 'listItem');
    const result = list(getMockState(state), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    sinon.assert.calledTwice(spy);

    let oneOrder = 0;
    let twoOrder = 1;

    if (state.sort === 'descending') {
      oneOrder = 1;
      twoOrder = 0;
    }

    expect(spy.getCalls()[oneOrder].args[0]).to.eql({
      file: 'one',
      isSelected: false,
      label: 'One',
      path: '',
    });
    expect(spy.getCalls()[twoOrder].args[0]).to.eql({
      file: 'two',
      isSelected: false,
      label: 'Two',
      path: '',
    });

    spy.restore();
  };

  test('Renders correctly if files is false', () => {
    const result = list(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are no files', () => {
    const result = list(getMockState({ files: [] }), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders the files in "ascending" order', () => {
    testRendering({ files: ['one', 'two'], sort: 'ascending' });
  });

  test('Renders the files in "descending" order', () => {
    testRendering({ files: ['one', 'two'], sort: 'descending' });
  });
});
