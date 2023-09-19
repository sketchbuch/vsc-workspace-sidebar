import { expect } from 'chai'

import { cleanFileIconKey } from '../../../../../theme/utils/strings/cleanFileIconKey'

interface TestObject {
  cleanedKey: string
  key: string
  replace: string
  search: string
}

type TestObjects = TestObject[]

suite('Theme > Utils > Theme > cleanFileIconKey()', () => {
  const testReplacement = ({ cleanedKey, key, replace, search }: TestObject) => {
    test(`Replaces "${search}" with "${replace}"`, () => {
      expect(cleanFileIconKey(key)).to.eql(cleanedKey)
    })
  }

  const testKeys: TestObjects = [
    { cleanedKey: 'some-key', key: 'some.key', replace: '-', search: '.' },
    { cleanedKey: 'some-key', key: 'some/key', replace: '/', search: '.' },
    { cleanedKey: 'cpp', key: 'c++', replace: 'p', search: '+' },
    { cleanedKey: 'ch', key: 'c#', replace: 'h', search: '#' },
  ]

  testKeys.forEach((testObj) => {
    testReplacement(testObj)
  })
})
