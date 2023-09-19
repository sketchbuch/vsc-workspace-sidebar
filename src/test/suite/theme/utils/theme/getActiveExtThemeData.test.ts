import { expect } from 'chai'
import mockFs from 'mock-fs'
import * as os from 'os'
import * as sinon from 'sinon'

import { DEFAULT_THEME } from '../../../../../theme/constants'
import {
  getDefaultExtThemeData,
  getUserExtThemeData,
} from '../../../../../themeNpm/utils/theme/getActiveExtThemeData'

suite('Theme > Utils > Theme >', () => {
  suite('getDefaultExtThemeData():', () => {
    test('Returns null if theme is not found', () => {
      expect(getDefaultExtThemeData('non-existent-theme')).to.be.null
    })

    test('Returns null if the theme ID is not a theme extension', () => {
      expect(getDefaultExtThemeData('vscode.css')).to.be.null
    })

    test('Returns ext data if the theme ID is a theme extension', () => {
      expect(getDefaultExtThemeData(DEFAULT_THEME)).to.eql({
        extId: 'vscode.vscode-theme-seti',
        extPath: '/usr/share/code/resources/app/extensions/theme-seti',
        themeId: DEFAULT_THEME,
        themePath: `./icons/${DEFAULT_THEME}-icon-theme.json`,
      })
    })
  })

  suite('getUserExtThemeData():', () => {
    const OS_HOME = '/home/user'
    const EXT_NONTHEME = 'ext-nontheme'
    const EXT_THEME = 'ext-theme'
    const mockContent = {
      contributes: {
        iconThemes: [{ id: EXT_THEME, path: `'./icons/${EXT_THEME}-icon-theme.json'` }],
      },
    }

    let homeDirStub: sinon.SinonStub

    suiteSetup(() => {
      homeDirStub = sinon.stub(os, 'homedir').returns(OS_HOME)
      mockFs({
        '.vscode': {
          extensions: {
            [EXT_NONTHEME]: {
              'package.json': '{contributes: {iconThemes: []}}',
            },
            [EXT_THEME]: {
              'package.json': JSON.stringify(mockContent),
            },
          },
        },
      })
    })

    suiteTeardown(() => {
      homeDirStub.restore()
      mockFs.restore()
    })

    test('Returns null if theme is not found', async () => {
      const result = await getUserExtThemeData('non-existent-theme')

      expect(result).to.be.null
    })

    test('Returns null if the theme ID is not a theme extension', async () => {
      const result = await getUserExtThemeData(EXT_NONTHEME)

      expect(result).to.be.null
    })

    test('Returns ext data if the theme ID is a theme extension', async () => {
      const result = await getUserExtThemeData(EXT_THEME)

      expect(result).to.eql({
        extId: EXT_THEME,
        extPath: `/home/stephen/.vscode/extensions/${EXT_THEME}`,
        themeId: mockContent.contributes.iconThemes[0].id,
        themePath: mockContent.contributes.iconThemes[0].path,
      })
    })
  })
})
