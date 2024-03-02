import { expect } from 'chai'
import * as path from 'path'
import { getDescription } from '../../../../templates/helpers/getDescription'

suite('Templates > Helpers > getDescription():', () => {
  const subFolder = 'subfolder'
  const descriptionPath = path.join('folder', subFolder)

  test('Returns descriptionPath as-is if crop is "false"', () => {
    expect(getDescription(descriptionPath, false)).to.equal(descriptionPath)
  })

  test('Returns descriptionPath cropped if crop is "true"', () => {
    expect(getDescription(descriptionPath, true)).to.equal(subFolder)
  })
})
