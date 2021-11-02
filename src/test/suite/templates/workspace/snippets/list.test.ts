import { expect } from 'chai';
import { t } from 'vscode-ext-localisation';
import { list } from '../../../../../templates/workspace';
import { getMockState, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: list()', () => {
  test('Renders nothing if files is false', () => {
    const result = list(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders nothing if there are no files', () => {
    const result = list(getMockState({ files: [], visibleFiles: [] }), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders "no match" message if searching and no visible files.', () => {
    const result = list(
      getMockState({ files: [], visibleFiles: [], search: 'flutter' }),
      mockRenderVars
    );

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result.includes('class="list__list-searchedout"')).to.equal(true);
    expect(result.includes(t('webViews.workspace.searchedOut'))).to.equal(true);
  });
});
