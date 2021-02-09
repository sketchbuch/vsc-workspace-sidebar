import { expect } from 'chai';
import * as sinon from 'sinon';
import { t } from 'vscode-ext-localisation';
import { FS_WS_FILETYPE } from '../../../../../constants';
import { list } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/listItem';
import { getMockFiles, getMockState, mockRenderVars } from '../../../../mocks';

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

  test('Renders the files', () => {
    const spy = sinon.spy(snippets, 'listItem');
    const mockFiles = getMockFiles(2);
    const result = list(
      getMockState({
        files: [`file-1.${FS_WS_FILETYPE}`, `file-2.${FS_WS_FILETYPE}`],
        sort: 'ascending',
        visibleFiles: mockFiles,
      }),
      mockRenderVars
    );

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result.includes('class="list__list"')).to.equal(true);
    sinon.assert.calledTwice(spy);

    expect(spy.getCalls()[0].args[0]).to.eql(mockFiles[0]);
    expect(spy.getCalls()[1].args[0]).to.eql(mockFiles[1]);

    spy.restore();
  });
});
