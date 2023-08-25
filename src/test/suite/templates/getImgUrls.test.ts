import { expect } from 'chai'
import * as path from 'path'
import { getImgUrls } from '../../../templates/getImgUrls'
import { getMockRenderVars } from '../../mocks/mockRenderVars'

suite('Templates > getImgUrls()', () => {
  const iconName = 'success'

  test('Returns expected dark and light URLs', () => {
    const mockRenderVars = getMockRenderVars()
    expect(getImgUrls(mockRenderVars, iconName)).to.eql({
      dark: `${mockRenderVars.imgDarkFolderUri}${path.sep}${iconName}.svg`,
      light: `${mockRenderVars.imgLightFolderUri}${path.sep}${iconName}.svg`,
    })
  })
})
