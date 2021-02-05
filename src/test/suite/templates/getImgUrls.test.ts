import { expect } from 'chai';
import * as path from 'path';
import { getImgUrls } from '../../../templates';
import { mockRenderVars } from '../../mocks';

suite('Templates > getImgUrls()', () => {
  const iconName = 'success';

  test('Returns expected dark and light URLs', () => {
    expect(getImgUrls(mockRenderVars, iconName)).to.eql({
      dark: `${mockRenderVars.imgDarkFolderUri}${path.sep}${iconName}.svg`,
      light: `${mockRenderVars.imgLightFolderUri}${path.sep}${iconName}.svg`,
    });
  });
});
