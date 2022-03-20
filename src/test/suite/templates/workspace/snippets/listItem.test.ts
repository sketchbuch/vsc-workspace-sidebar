import { expect } from 'chai';
import * as sinon from 'sinon';
import { listItem } from '../../../../../templates/workspace';
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons';
import * as icons from '../../../../../templates/workspace/snippets/listItemIcon';
import { getMockFiles, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: listItem()', () => {
  test('Renders correctly', () => {
    const [file] = getMockFiles(1, { showPath: true });
    const result = listItem(file, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('class="list__item');
    expect(result).contains('class="list__title"');
    expect(result).contains(file.label);
    expect(result).contains('class="list__description"');
    expect(result).contains(`data-file="${file.file}"`);
    expect(result).contains(file.path);
  });

  test('Description is not rendered if showPath = "false"', () => {
    const [file] = getMockFiles(1, { showPath: false });
    const result = listItem(file, mockRenderVars);

    expect(result).not.contains('class="list__description"');
  });

  test('Renders selected files correctly', () => {
    const btnSpy = sinon.spy(buttons, 'listItemButtons');
    const iconSpy = sinon.spy(icons, 'listItemIcon');

    const [file] = getMockFiles(1, { isSelected: true, showPath: false });
    const result = listItem(file, mockRenderVars);

    expect(result).contains('list__styled-item--selected');
    expect(result).contains(`title="Current workspace"`);

    sinon.assert.callCount(btnSpy, 0);
    sinon.assert.callCount(iconSpy, 1);
    sinon.assert.calledWith(iconSpy, mockRenderVars);

    btnSpy.restore();
    iconSpy.restore();
  });

  test('Renders unselected files correctly', () => {
    const btnSpy = sinon.spy(buttons, 'listItemButtons');
    const iconSpy = sinon.spy(icons, 'listItemIcon');

    const [file] = getMockFiles(1, { showPath: false });
    const result = listItem(file, mockRenderVars);

    expect(result).not.contains('list__styled-item--selected');
    expect(result).contains(`title="Open '${file.label}' in this window"`);

    sinon.assert.callCount(btnSpy, 1);
    sinon.assert.calledWith(btnSpy, file, mockRenderVars);
    sinon.assert.callCount(iconSpy, 0);

    btnSpy.restore();
    iconSpy.restore();
  });
});
