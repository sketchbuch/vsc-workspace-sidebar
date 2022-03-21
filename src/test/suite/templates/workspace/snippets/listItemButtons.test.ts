import { expect } from 'chai';
import * as sinon from 'sinon';
import * as icons from '../../../../../templates/getImgUrls';
import { listItemButtons } from '../../../../../templates/workspace/snippets/listItemButtons';
import { getMockFiles } from '../../../../mocks/mockFiles';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';

suite('Templates > Workspace > Snippets: listItemButtons()', () => {
  const [file] = getMockFiles(1, { showPath: false });

  test('Renders correctly', () => {
    const spy = sinon.spy(icons, 'getImgUrls');

    const result = listItemButtons(file, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="list__buttons"');
    expect(result).contains(`data-file="${file.file}"`);
    expect(result).contains(`<img alt="New window icon" data-theme="dark"`);
    expect(result).contains(`<img alt="New window icon" data-theme="light"`);
    expect(result).contains(`title="Open '${file.label}' in a new window"`);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockRenderVars, 'new-window');

    spy.restore();
  });
});
