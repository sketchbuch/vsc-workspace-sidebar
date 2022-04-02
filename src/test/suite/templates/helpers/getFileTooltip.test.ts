import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../config/getConfig';
import { ConfigActions } from '../../../../constants/config';
import { getFileTooltip } from '../../../../templates/helpers/getFileTooltip';
import { File } from '../../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { file1 } from '../../../mocks/mockFileData';

suite('Templates > Helpers > getFileTooltip():', () => {
  const fileNotSelected: File = { ...file1, showPath: false };
  const fileSelected: File = { ...file1, isSelected: true, showPath: false };

  let actionConfigStub: sinon.SinonStub;

  setup(() => {
    actionConfigStub = sinon
      .stub(configs, 'getActionsConfig')
      .callsFake(() => ConfigActions.CURRENT_WINDOW);
  });

  teardown(() => {
    actionConfigStub.restore();
  });

  test('Returns label as tooltip if no type, and not selected', () => {
    expect(getFileTooltip(fileNotSelected)).to.equal(fileNotSelected.label);
  });

  test('Returns selected tooltip if selected', () => {
    expect(getFileTooltip(fileSelected)).to.equal('Current workspace');
  });

  suite('Click action is CURRENT_WINDOW:', () => {
    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      expect(getFileTooltip(fileNotSelected, 'new-win')).to.equal(
        `Open '${fileNotSelected.label}' in a new window`
      );
    });

    test('Returns cur win tooltip if !selected and type is "cur-win"', () => {
      expect(getFileTooltip(fileNotSelected, 'cur-win')).to.equal(
        `Open '${fileNotSelected.label}' in this window`
      );
    });
  });

  suite('Click action is NEW_WINDOW (reverses cur and new tooltips):', () => {
    test('Returns cur win tooltip if !selected and type is "new-win"', () => {
      actionConfigStub.callsFake(() => ConfigActions.NEW_WINDOW);
      expect(getFileTooltip(fileNotSelected, 'new-win')).to.equal(
        `Open '${fileNotSelected.label}' in this window`
      );
    });

    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      actionConfigStub.callsFake(() => ConfigActions.NEW_WINDOW);
      expect(getFileTooltip(fileNotSelected, 'cur-win')).to.equal(
        `Open '${fileNotSelected.label}' in a new window`
      );
    });
  });

  test('Returns a tooltip with path if showPath is "true"', () => {
    expect(getFileTooltip({ ...fileNotSelected, showPath: true })).to.equal(
      `${fileNotSelected.label} (${fileNotSelected.path})`
    );
  });
});
