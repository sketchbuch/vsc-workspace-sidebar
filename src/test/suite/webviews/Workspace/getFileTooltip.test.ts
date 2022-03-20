import { expect } from 'chai';
import { getFileTooltip } from '../../../../webviews/Workspace/helpers/getFileTooltip';
import { getMockFiles } from '../../../mocks/mockFiles';

suite('Webviews > Workspace > getFileTooltip():', () => {
  const mockFile = getMockFiles(1, { showPath: false })[0];
  const mockSelectedFile = getMockFiles(1, { isSelected: true, showPath: false })[0];

  test('Returns label as tooltip if no type, and not selected', () => {
    expect(getFileTooltip(mockFile)).to.equal(mockFile.label);
  });

  test('Returns selected tooltip if selected', () => {
    expect(getFileTooltip(mockSelectedFile)).to.equal('Current workspace');
  });

  test('Returns new win tooltip if !selected and type is "new-win"', () => {
    expect(getFileTooltip(mockFile, 'new-win')).to.equal(
      `Open '${mockFile.label}' in a new window`
    );
  });

  test('Returns new win tooltip if !selected and type is "cur-win"', () => {
    expect(getFileTooltip(mockFile, 'cur-win')).to.equal(`Open '${mockFile.label}' in this window`);
  });

  test('Returns a tooltip with path if showPath is "true"', () => {
    const mockTestFile = getMockFiles(1, { showPath: true })[0];
    expect(getFileTooltip(mockTestFile)).to.equal(`${mockFile.label} (${mockFile.path})`);
  });
});
