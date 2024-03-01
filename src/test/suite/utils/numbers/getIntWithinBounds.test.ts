import { expect } from 'chai'
import { getIntWithinBounds } from '../../../../utils/numbers/getIntWithinBounds'

suite('Utils > Numbers > getIntWithinBounds()', () => {
  const min = 0
  const max = 10

  test('Returns num if within bounds', () => {
    expect(getIntWithinBounds(min, min, max)).to.equal(0)
    expect(getIntWithinBounds(5, min, max)).to.equal(5)
    expect(getIntWithinBounds(max, min, max)).to.equal(max)
  })

  test('Returns min, if num less than min', () => {
    expect(getIntWithinBounds(-2, min, max)).to.equal(min)
  })

  test('Returns max, if num greater than max', () => {
    expect(getIntWithinBounds(12, min, max)).to.equal(max)
  })
})
