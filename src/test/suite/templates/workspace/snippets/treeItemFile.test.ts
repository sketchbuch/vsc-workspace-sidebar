import { expect } from 'chai';
import * as sinon from 'sinon';
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons';
import * as selected from '../../../../../templates/workspace/snippets/listItemIcon';
import * as icons from '../../../../../templates/workspace/snippets/treeIcons';
import * as indent from '../../../../../templates/workspace/snippets/treeIndent';
import { treeItemFile } from '../../../../../templates/workspace/snippets/treeItemFile';
import { file1 } from '../../../../mocks/mockFileData';
import { getMockRenderVars } from '../../../../mocks/mockRenderVars';

suite.only('Templates > Workspace > Snippets: treeItemFile()', () => {
  const DEPTH = 0;
  const file = { ...file1, showPath: false };
  const mockRenderVars = getMockRenderVars();

  let buttonSpy: sinon.SinonSpy;
  let iconTreeSpy: sinon.SinonSpy;
  let indentSpy: sinon.SinonSpy;
  let selectedIconSpy: sinon.SinonSpy;

  setup(() => {
    buttonSpy = sinon.spy(buttons, 'listItemButtons');
    iconTreeSpy = sinon.spy(icons, 'treeIconFile');
    indentSpy = sinon.spy(indent, 'treeIndent');
    selectedIconSpy = sinon.spy(selected, 'listItemIcon');
  });

  teardown(() => {
    buttonSpy.restore();
    iconTreeSpy.restore();
    indentSpy.restore();
    selectedIconSpy.restore();
  });

  test.only('Renders correctly', () => {
    const result = treeItemFile(file, DEPTH, mockRenderVars);
    console.log('### result', result);

    //expect(result).to.be.a('string');
    /* expect(result).contains(`data-file="${file.file}"`);
    expect(result).contains(`data-depth="${DEPTH}"`);
    expect(result).contains(
      `<span class="list__element" title="Open '${file.label}' in this window">`
    );
    expect(result).contains(`<span class="list__title">${file.label}</span>`);

    sinon.assert.calledOnce(indentSpy);
    sinon.assert.calledOnce(iconTreeSpy); */
  });

  test('Renders correctly when selected', () => {
    const file = { ...file1, showPath: false, isSelected: true };
    const result = treeItemFile(file, DEPTH, mockRenderVars);

    expect(result).contains(`list__styled-item--selected`);

    sinon.assert.notCalled(buttonSpy);
    sinon.assert.calledOnce(selectedIconSpy);
  });

  test('Renders correctly when not selected', () => {
    const result = treeItemFile(file, DEPTH, mockRenderVars);

    expect(result).contains(`list__styled-item--unselected`);

    sinon.assert.calledOnce(buttonSpy);
    sinon.assert.notCalled(selectedIconSpy);
  });

  test('Renders description if condensed', () => {
    const file = { ...file1, showPath: true };
    const result = treeItemFile(file, DEPTH, getMockRenderVars({ condenseFileTree: true }));

    expect(result).contains(`list__description`);
  });

  test('Does not render description if not condensed', () => {
    const file = { ...file1, showPath: true };
    const result = treeItemFile(file, DEPTH, getMockRenderVars({ condenseFileTree: false }));

    expect(result).not.contains(`list__description`);
  });
});
