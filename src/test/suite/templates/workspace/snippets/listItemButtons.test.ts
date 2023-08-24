import { expect } from 'chai';
import * as sinon from 'sinon';
import { WorkspaceButtons } from '../../../../../templates/helpers/getWorkspaceButtons';
import * as lib from '../../../../../templates/workspace/snippets/listItemButton';
import { listItemButtons } from '../../../../../templates/workspace/snippets/listItemButtons';
import { file1 } from '../../../../mocks/mockFileData';
import { getMockRenderVars } from '../../../../mocks/mockRenderVars';

suite('Templates > Workspace > Snippets: listItemButtons()', () => {
  const file = { ...file1, showPath: false };
  const mockRenderVars = getMockRenderVars();

  test('Renders correctly', () => {
    const spy = sinon.spy(lib, 'listItemButton');
    const buttons: WorkspaceButtons = [
      {
        ariaLabel: 'not important',
        file: file.file,
        renderVars: mockRenderVars,
        tooltip: 'not important',
        type: 'open-filemanager',
      },
    ];

    const result = listItemButtons(buttons);

    expect(result).to.be.a('string');
    expect(result).contains('class="list__buttons"');

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, buttons[0]);

    spy.restore();
  });
});
