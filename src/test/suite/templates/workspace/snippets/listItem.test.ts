import { expect } from 'chai';
import * as sinon from 'sinon';
import { t } from 'vscode-ext-localisation';
import { listItem } from '../../../../../templates/workspace';
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons';
import * as icons from '../../../../../templates/workspace/snippets/listItemIcon';
import { getMockFiles, mockRenderVars } from '../../../../mocks';

suite('Templates > Workspace > Snippets: listItem()', () => {
  const [file] = getMockFiles(1);

  test('Renders correctly', () => {
    const result = listItem(file, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result.includes('class="list__item"')).to.equal(true);
    expect(result.includes('class="list__title"')).to.equal(true);
    expect(result).to.include(file.label);
    expect(result.includes('class="list__description"')).to.equal(false);
    expect(result.includes(`data-file="${file.file}"`)).to.equal(true);
  });

  test('Renders description if path is not empty', () => {
    const [fileWithPath] = getMockFiles(1, { hasPath: true });
    const result = listItem(fileWithPath, mockRenderVars);

    expect(result.includes('class="list__description"')).to.equal(true);
    expect(result).to.include(file.path);
  });

  test('Renders selected files correctly', () => {
    const [fileSelected] = getMockFiles(1, { hasPath: false, isSelected: true });
    const btnSpy = sinon.spy(buttons, 'listItemButtons');
    const iconSpy = sinon.spy(icons, 'listItemIcon');
    const result = listItem(fileSelected, mockRenderVars);

    expect(result.includes('list__element--selected')).to.equal(true);
    expect(result.includes(`title="${t('webViews.workspace.listItem.selected')}"`)).to.equal(true);

    sinon.assert.callCount(btnSpy, 0);
    sinon.assert.callCount(iconSpy, 1);
    sinon.assert.calledWith(iconSpy, mockRenderVars);
    btnSpy.restore();
    iconSpy.restore();
  });

  test('Renders unselected files correctly', () => {
    const btnSpy = sinon.spy(buttons, 'listItemButtons');
    const iconSpy = sinon.spy(icons, 'listItemIcon');
    const result = listItem(file, mockRenderVars);

    expect(result.includes('list__element--unselected')).to.equal(true);
    expect(
      result.includes(
        `title="${t('webViews.workspace.listItem.openCurWin', { label: file.label })}"`
      )
    ).to.equal(true);

    sinon.assert.callCount(btnSpy, 1);
    sinon.assert.calledWith(btnSpy, file, mockRenderVars);
    sinon.assert.callCount(iconSpy, 0);
    btnSpy.restore();
    iconSpy.restore();
  });
});
