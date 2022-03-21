import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../config/getConfig';
import { ConfigActions } from '../../../../constants/config';
import { getFileTooltip } from '../../../../templates/helpers/getFileTooltip';
import { getMockFiles } from '../../../mocks/mockFiles';

suite('Templates > Helpers > getFileTooltip():', () => {
  const mockFile = getMockFiles(1, { showPath: false })[0];
  const mockSelectedFile = getMockFiles(1, { isSelected: true, showPath: false })[0];

  let configStub: sinon.SinonStub;

  setup(() => {
    configStub = sinon
      .stub(configs, 'getActionsConfig')
      .callsFake(() => ConfigActions.CURRENT_WINDOW);
  });

  teardown(() => {
    configStub.restore();
  });

  test('Returns label as tooltip if no type, and not selected', () => {
    expect(getFileTooltip(mockFile)).to.equal(mockFile.label);
  });

  test('Returns selected tooltip if selected', () => {
    expect(getFileTooltip(mockSelectedFile)).to.equal('Current workspace');
  });

  suite('Click action is CURRENT_WINDOW:', () => {
    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      expect(getFileTooltip(mockFile, 'new-win')).to.equal(
        `Open '${mockFile.label}' in a new window`
      );
    });

    test('Returns cur win tooltip if !selected and type is "cur-win"', () => {
      expect(getFileTooltip(mockFile, 'cur-win')).to.equal(
        `Open '${mockFile.label}' in this window`
      );
    });
  });

  suite('Click action is NEW_WINDOW (reverses cur and new tooltips):', () => {
    test('Returns cur win tooltip if !selected and type is "new-win"', () => {
      configStub.callsFake(() => ConfigActions.NEW_WINDOW);
      expect(getFileTooltip(mockFile, 'new-win')).to.equal(
        `Open '${mockFile.label}' in this window`
      );
    });

    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      configStub.callsFake(() => ConfigActions.NEW_WINDOW);
      expect(getFileTooltip(mockFile, 'cur-win')).to.equal(
        `Open '${mockFile.label}' in a new window`
      );
    });
  });

  test('Returns a tooltip with path if showPath is "true"', () => {
    const mockTestFile = getMockFiles(1, { showPath: true })[0];
    expect(getFileTooltip(mockTestFile)).to.equal(`${mockFile.label} (${mockFile.path})`);
  });
});
