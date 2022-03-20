import { expect } from 'chai';
import { treeIndent } from '../../../../../templates/workspace/snippets/treeIndent';

suite('Templates > Workspace > Snippets: treeIndent()', () => {
  test('Renders an empty string for depth 0', () => {
    const result = treeIndent(0);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders an indent div for each depth level', () => {
    const result = treeIndent(2);

    expect(result).to.be.a('string');
    expect(result).contains(`<div class="list_branch-indent-box">`);
    expect(result.match(/"list_branch-indent"/g) || []).to.have.lengthOf(2);
  });
});
