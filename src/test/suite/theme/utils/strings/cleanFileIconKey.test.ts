import { expect } from 'chai'

import { cleanFileIconKey } from '../../../../../theme/utils/strings/cleanFileIconKey'

suite('Theme > Utils > Theme > cleanFileIconKey()', () => {
  test('Replaces underscores and hyphens', () => {
    expect(cleanFileIconKey('some_key-test')).to.equal('some.key.test')
  })
})
