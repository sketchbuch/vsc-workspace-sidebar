import { expect } from 'chai';
import { FS_FOLDER_IMAGES, FS_FOLDER_RESOURCES } from '../../../../constants';
import { getImagePath } from '../../../../utils';
import { extensionPath } from '../../../mocks';

suite('Utils > getImagePath()', () => {
  test('Returns the expected image path', () => {
    const result = getImagePath(extensionPath, 'light', 'icon.png');
    expect(result).to.equal(
      `${extensionPath}/${FS_FOLDER_RESOURCES}/${FS_FOLDER_IMAGES}/light/icon.png`
    );
  });
});
