import { expect } from 'chai'
import * as path from 'path'
import * as sinon from 'sinon'
import { isSelected } from '../../../../utils/fs/isSelected'
import * as os from '../../../../utils/os/isWindows'

suite('Webviews > Fs > isSelected():', () => {
  let osHomeStub: sinon.SinonStub

  const dart = path.join('file', 'dart')
  const react = path.join('file', 'react')
  const dartWin = path.join('C:', 'file', 'dart')
  const reactWin = path.join('C:', 'file', 'react')

  setup(() => {
    osHomeStub = sinon.stub(os, 'isWindows').callsFake(() => false)
  })

  teardown(() => {
    osHomeStub.restore()
  })

  test('Correctly detects a selected Workspace', () => {
    expect(isSelected(react, react)).to.eql(true)
  })

  test('Correctly detects an unselected Workspace', () => {
    expect(isSelected(dart, react)).to.eql(false)
  })

  suite('Windows Drive Letter Case Tests', () => {
    test('Correctly detects a selected Workspace (Windows)', () => {
      osHomeStub.callsFake(() => true)
      expect(isSelected(reactWin, reactWin)).to.eql(true)
    })

    test('Correctly detects an unselected Workspace (Windows)', () => {
      osHomeStub.callsFake(() => true)
      expect(isSelected(dartWin, reactWin)).to.eql(false)
    })
  })
})
