import { expect } from 'chai'
import * as vscode from 'vscode'

import { isLightTheme } from '../../../../../themeNpm/utils/theme/isLightTheme'

suite('Theme > Utils > Theme > isLightTheme()', () => {
  test('Returns false if the theme is "Dark"', () => {
    expect(isLightTheme({ kind: vscode.ColorThemeKind.Dark } as vscode.ColorTheme)).to.equal(false)
  })

  test('Returns false if the theme is "HighContrast"', () => {
    expect(
      isLightTheme({ kind: vscode.ColorThemeKind.HighContrast } as vscode.ColorTheme)
    ).to.equal(false)
  })

  test('Returns true if the theme is "Light"', () => {
    expect(isLightTheme({ kind: vscode.ColorThemeKind.Light } as vscode.ColorTheme)).to.equal(true)
  })

  test('Returns true if the theme is "HighContrastLight"', () => {
    expect(
      isLightTheme({ kind: vscode.ColorThemeKind.HighContrastLight } as vscode.ColorTheme)
    ).to.equal(true)
  })
})
