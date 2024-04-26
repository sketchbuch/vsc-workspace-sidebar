import { expect } from 'chai'
import { ConfigActions } from '../../../../constants/config'
import { getFileTooltip } from '../../../../templates/helpers/getFileTooltip'
import { file1 } from '../../../mocks/mockFileData'
import { getMockRenderVars } from '../../../mocks/mockRenderVars'

suite('Templates > Helpers > getFileTooltip():', () => {
  const mockRenderVars = getMockRenderVars({ clickAction: ConfigActions.CURRENT_WINDOW })

  test('Returns label as tooltip if no type, and not selected', () => {
    expect(
      getFileTooltip({
        isSelected: false,
        path: file1.path,
        renderVars: mockRenderVars,
        showPath: false,
        visibleLabel: file1.label,
      })
    ).to.equal(file1.label)
  })

  test('Returns selected tooltip if selected', () => {
    expect(
      getFileTooltip({
        isSelected: true,
        path: file1.path,
        renderVars: mockRenderVars,
        showPath: false,
        visibleLabel: file1.label,
      })
    ).to.equal('Current workspace')
  })

  test('Returns selected tooltip if selected outside of root folders', () => {
    expect(
      getFileTooltip({
        isSelected: true,
        path: file1.path,
        renderVars: { ...mockRenderVars, isExternalWs: true },
        showPath: false,
        visibleLabel: file1.label,
      })
    ).to.equal('Current workspace (not within root folders)')
  })

  suite('Click action is CURRENT_WINDOW:', () => {
    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      expect(
        getFileTooltip({
          isSelected: false,
          path: file1.path,
          renderVars: mockRenderVars,
          showPath: false,
          visibleLabel: file1.label,
          type: 'new-win',
        })
      ).to.equal(`Open '${file1.label}' in a new window`)
    })

    test('Returns cur win tooltip if !selected and type is "cur-win"', () => {
      expect(
        getFileTooltip({
          isSelected: false,
          path: file1.path,
          renderVars: mockRenderVars,
          showPath: false,
          visibleLabel: file1.label,
          type: 'cur-win',
        })
      ).to.equal(`Open '${file1.label}' in this window`)
    })
  })

  suite('Click action is NEW_WINDOW (reverses cur and new tooltips):', () => {
    test('Returns cur win tooltip if !selected and type is "new-win"', () => {
      const mockRenderVars = getMockRenderVars({ clickAction: ConfigActions.NEW_WINDOW })
      expect(
        getFileTooltip({
          isSelected: false,
          path: file1.path,
          renderVars: mockRenderVars,
          showPath: false,
          visibleLabel: file1.label,
          type: 'new-win',
        })
      ).to.equal(`Open '${file1.label}' in this window`)
    })

    test('Returns new win tooltip if !selected and type is "new-win"', () => {
      const mockRenderVars = getMockRenderVars({ clickAction: ConfigActions.NEW_WINDOW })
      expect(
        getFileTooltip({
          isSelected: false,
          path: file1.path,
          renderVars: mockRenderVars,
          showPath: false,
          visibleLabel: file1.label,
          type: 'cur-win',
        })
      ).to.equal(`Open '${file1.label}' in a new window`)
    })
  })

  test('Returns a tooltip with path if showPath is "true"', () => {
    expect(
      getFileTooltip({
        isSelected: false,
        path: file1.path,
        renderVars: mockRenderVars,
        showPath: true,
        visibleLabel: file1.label,
      })
    ).to.equal(`${file1.label} (${file1.path})`)
  })

  test('Returns a tooltip without path if showPath is "true" but path is empty', () => {
    expect(
      getFileTooltip({
        isSelected: false,
        path: '',
        renderVars: mockRenderVars,
        showPath: true,
        visibleLabel: file1.label,
      })
    ).to.equal(`${file1.label}`)
  })
})
