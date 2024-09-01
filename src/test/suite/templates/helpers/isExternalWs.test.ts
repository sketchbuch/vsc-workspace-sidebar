import { expect } from 'chai'
import * as path from 'path'
import { isExternalWs } from '../../../../templates/helpers/isExternalWs'
import { OS_HOMEFOLDER, file2 } from '../../../mocks/mockFileData'
import { getMockRootFolders, getMockState } from '../../../mocks/mockState'

suite('Templates > Helpers > isExternalWs():', () => {
  test('Returns true if there is no selected', () => {
    expect(isExternalWs(getMockState({ selected: undefined }))).to.be.true
    expect(isExternalWs(getMockState({ selected: '' }))).to.be.true
  })

  test('Returns true if the current ws does not match selected', () => {
    const mockRootFolders = getMockRootFolders()
    const selected = path.join(OS_HOMEFOLDER, 'jest')
    const state = getMockState({ ...mockRootFolders, selected })

    expect(isExternalWs(state)).to.be.true
  })

  test('Returns false if the current ws matches selected', () => {
    const mockRootFolders = getMockRootFolders()
    const selected = file2.file
    const state = getMockState({ ...mockRootFolders, selected })

    expect(isExternalWs(state)).to.be.false
  })

  test('Returns false if wsType is "none"', () => {
    const mockRootFolders = getMockRootFolders()
    const state = getMockState({ ...mockRootFolders, wsType: 'none' })

    expect(isExternalWs(state)).to.be.false
  })

  test('Returns false if wsType is "folder"', () => {
    const mockRootFolders = getMockRootFolders()
    const state = getMockState({ ...mockRootFolders, wsType: 'folder' })

    expect(isExternalWs(state)).to.be.false
  })

  test('Returns false if selected starts with the root folder path and the root folder is loading', () => {
    const mockRootFolders = getMockRootFolders()
    mockRootFolders.rootFolders[0].result = 'loading'
    const selected = file2.file
    const state = getMockState({ ...mockRootFolders, selected })

    expect(isExternalWs(state)).to.be.false
  })
})
