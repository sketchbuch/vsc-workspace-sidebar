import { expect } from 'chai';
import * as sinon from 'sinon';
import * as buttons from '../../../../../templates/workspace/snippets/listItemButtons';
import * as selected from '../../../../../templates/workspace/snippets/listItemIcon';
import * as icons from '../../../../../templates/workspace/snippets/treeIcons';
import * as indent from '../../../../../templates/workspace/snippets/treeIndent';
import { treeItemFile } from '../../../../../templates/workspace/snippets/treeItemFile';
import { getMockFiles } from '../../../../mocks/mockFiles';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';

suite('Templates > Workspace > Snippets: treeItemFile()', () => {
  const DEPTH = 0;
  const [file] = getMockFiles(1, { showPath: false });

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

  test('Renders correctly', () => {
    const result = treeItemFile(file, DEPTH, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains(`data-file="${file.file}"`);
    expect(result).contains(`data-depth="${DEPTH}"`);
    expect(result).contains(
      `<span class="list__element" title="Open '${file.label}' in this window">`
    );
    expect(result).contains(`<span class="list__title">${file.label}</span>`);

    sinon.assert.calledOnce(indentSpy);
    sinon.assert.calledOnce(iconTreeSpy);
  });

  test('Renders correctly when selected', () => {
    const [file] = getMockFiles(1, { showPath: false, isSelected: true });
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
});
