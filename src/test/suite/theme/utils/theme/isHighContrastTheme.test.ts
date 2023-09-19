import { expect } from 'chai'
import * as vscode from 'vscode'

import { isHighContrastTheme } from '../../../../../theme/utils/theme/isHighContrastTheme'

suite('Theme > Utils > Theme > isHighContrastTheme()', () => {
  test('Returns false if the theme is "Dark"', () => {
    expect(isHighContrastTheme({ kind: vscode.ColorThemeKind.Dark } as vscode.ColorTheme)).to.equal(
      false
    )
  })

  test('Returns false if the theme is "Light"', () => {
    expect(
      isHighContrastTheme({ kind: vscode.ColorThemeKind.Light } as vscode.ColorTheme)
    ).to.equal(false)
  })

  test('Returns true if the theme is "HighContrast"', () => {
    expect(
      isHighContrastTheme({ kind: vscode.ColorThemeKind.HighContrast } as vscode.ColorTheme)
    ).to.equal(true)
  })

  test('Returns true if the theme is "HighContrastLight"', () => {
    expect(
      isHighContrastTheme({ kind: vscode.ColorThemeKind.HighContrastLight } as vscode.ColorTheme)
    ).to.equal(true)
  })
})
