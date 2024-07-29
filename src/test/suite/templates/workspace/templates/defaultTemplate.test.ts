import { expect } from 'chai'
import * as sinon from 'sinon'
import { defaultTemplate } from '../../../../../templates/workspace/templates/defaultTemplate'
import * as content from '../../../../../templates/workspace/views/listView'
import { getMockState } from '../../../../mocks/mockState'
import { getMockTemplateVars } from '../../../../mocks/mockTemplateVars'
import { getMockThemeData } from '../../../../mocks/mockThemeData'

suite('Templates > Workspace > Templates: defaultTemplate()', () => {
  const state = getMockState()
  const templateVars = getMockTemplateVars()

  test('Renders correctly', () => {
    const result = defaultTemplate(templateVars, state)
    expect(result).to.be.a('string')
    expect(result).contains('<!DOCTYPE html>')
    expect(result).contains('<html')
    expect(result).contains('</html>')
    expect(result).contains('<head')
    expect(result).contains('</head>')
    expect(result).contains('<body')
    expect(result).contains('</body>')
  })

  suite('<head>', () => {
    test('Contains a <title> tag', () => {
      const result = defaultTemplate(templateVars, state)
      expect(result).contains(`<title>Workspaces</title>`)
    })

    test('Renders the <title> tag correctly if list view', () => {
      const TITLE = '2/10'
      const result = defaultTemplate(
        getMockTemplateVars({ title: TITLE }),
        getMockState({ view: 'list' })
      )
      expect(result).contains(`<title>Workspaces: ${TITLE}</title>`)
    })

    test('Contains the correct Content-Security-Policy meta tag', () => {
      const result = defaultTemplate(templateVars, state)
      expect(result).contains('<meta http-equiv="Content-Security-Policy"')
      expect(result).contains(
        `content="default-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      )
      expect(result).contains(
        `img-src ${templateVars.cspSource} vscode-resource: data: 'nonce-${templateVars.nonce}`
      )
      expect(result).contains(
        `script-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      )
      expect(result).contains(
        `style-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      )
    })

    test('Contains workbench css script tag', () => {
      const result = defaultTemplate(templateVars, state)
      expect(result).contains('<style id="workbench-css"')
    })

    test('Renders  a <title> tag', () => {
      const result = defaultTemplate(templateVars, state)
      expect(result).contains(`<title>Workspaces</title>`)
    })
  })

  suite('<body>', () => {
    test('Contains <script> tags', () => {
      const result = defaultTemplate(templateVars, state)
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="ws-webview-js"`)
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="codicons-js"`)
    })

    test('Renders content', () => {
      let contentStub = sinon.stub(content, 'listView').callsFake(() => 'THE_CONTENT')

      const result = defaultTemplate(templateVars, state)
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="ws-webview-js"`)
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="codicons-js"`)
      expect(result).contains(`THE_CONTENT`)

      contentStub.restore()
    })
  })

  suite('File Icon CSS:', () => {
    const fileIconCss = '<style id="file-icon-css"'

    test('Not rendered if no cssData is null', () => {
      const templateVars = getMockTemplateVars({ cssData: null })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if no themeData is null', () => {
      const templateVars = getMockTemplateVars({ themeData: null })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if themeData.state is error', () => {
      const themeData = getMockThemeData({ state: 'error' })
      const templateVars = getMockTemplateVars({ themeData })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if themeData.state is idle', () => {
      const themeData = getMockThemeData({ state: 'idle' })
      const templateVars = getMockTemplateVars({ themeData })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if themeData.state is loading', () => {
      const themeData = getMockThemeData({ state: 'loading' })
      const templateVars = getMockTemplateVars({ themeData })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if themeData.data is null', () => {
      const themeData = getMockThemeData({ data: null, state: 'ready' })
      const templateVars = getMockTemplateVars({ themeData })
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Not rendered if themeData.themeId is null', () => {
      const templateVars = getMockTemplateVars()
      const result = defaultTemplate(templateVars, state)

      expect(result).not.contains(fileIconCss)
    })

    test('Renders if themeData and cssData are ok', () => {
      const templateVars = getMockTemplateVars({
        cssData: {
          defCount: 1,
          fontFaceCss: '',
          iconCss: '',
        },
      })
      const result = defaultTemplate(templateVars, state)
      expect(result).contains(`<style id="file-icon-css"`)
    })
  })
})
