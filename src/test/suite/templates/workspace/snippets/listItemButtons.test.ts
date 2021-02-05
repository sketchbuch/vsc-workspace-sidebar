import { expect } from 'chai';
import * as sinon from 'sinon';
import { t } from 'vscode-ext-localisation';
import * as icons from '../../../../../templates/getImgUrls';
import { listItemButtons } from '../../../../../templates/workspace/snippets/listItemButtons';
import { getMockFiles, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: listItemButtons()', () => {
  const [file] = getMockFiles(1);

  test('Renders correctly', () => {
    const spy = sinon.spy(icons, 'getImgUrls');
    const result = listItemButtons(file, mockRenderVars);
    const alt = t('webViews.workspace.listItem.iconAlt');

    expect(result).to.be.a('string');
    expect(result.includes('class="list__buttons"')).to.equal(true);
    expect(result.includes(`data-file="${file.file}"`)).to.equal(true);
    expect(result.includes(`<img alt="${alt}" data-theme="dark"`)).to.equal(true);
    expect(result.includes(`<img alt="${alt}" data-theme="light"`)).to.equal(true);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockRenderVars, 'new-window');
    spy.restore();
  });
});
