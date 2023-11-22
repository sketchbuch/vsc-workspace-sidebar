import { expect } from 'chai'
import * as path from 'path'
import {
  ConfigButtons,
  getWorkspaceButtons,
} from '../../../../templates/helpers/getWorkspaceButtons'
import { getMockRenderVars } from '../../../mocks/mockRenderVars'

suite('Templates > Helpers > getWorkspaceButtons():', () => {
  const mockRenderVars = getMockRenderVars()

  test('Returns an empty array if no button data', () => {
    expect(
      getWorkspaceButtons({
        buttons: [],
        renderVars: mockRenderVars,
      })
    ).to.eql([])
  })

  test('Returns expected buttons if there is button data', () => {
    const newWinFile = `${path.sep}sdcsdc${path.sep}dcdsc`
    const newWinLabel = 'scddscsd'

    const buttons: ConfigButtons = [
      {
        file: newWinFile,
        key: 'open-filemanager',
        label: newWinLabel,
      },
      {
        file: {
          cleanedLabel: newWinLabel,
          file: newWinFile,
          isSelected: false,
          label: newWinLabel,
          path: newWinFile,
          showPath: false,
        },
        key: 'new-window',
      },
    ]

    expect(
      getWorkspaceButtons({
        buttons,
        renderVars: mockRenderVars,
      })
    ).to.eql([
      {
        ariaLabel: `Open folder containing '${newWinLabel}' in your file manager`,
        file: buttons[0].file,
        renderVars: mockRenderVars,
        tooltip: `Open folder containing '${newWinLabel}' in your file manager`,
        type: buttons[0].key,
      },
      {
        ariaLabel: `Open '${newWinLabel}' in a new window`,
        file: newWinFile,
        renderVars: mockRenderVars,
        tooltip: `Open '${newWinLabel}' in a new window`,
        type: buttons[1].key,
      },
    ])
  })

  test('Returns expected buttons if there is button data with codicons', () => {
    const newWinFile = `${path.sep}sdcsdc${path.sep}dcdsc`
    const newWinLabel = 'scddscsd'

    const buttons: ConfigButtons = [
      {
        codicon: 'test',
        file: newWinFile,
        key: 'open-filemanager',
        label: newWinLabel,
      },
      {
        codicon: 'test',
        file: {
          cleanedLabel: newWinLabel,
          file: newWinFile,
          isSelected: false,
          label: newWinLabel,
          path: newWinFile,
          showPath: false,
        },
        key: 'new-window',
      },
    ]

    expect(
      getWorkspaceButtons({
        buttons,
        renderVars: mockRenderVars,
      })
    ).to.eql([
      {
        ariaLabel: `Open folder containing '${newWinLabel}' in your file manager`,
        codicon: 'test',
        file: buttons[0].file,
        renderVars: mockRenderVars,
        tooltip: `Open folder containing '${newWinLabel}' in your file manager`,
        type: buttons[0].key,
      },
      {
        ariaLabel: `Open '${newWinLabel}' in a new window`,
        codicon: 'test',
        file: newWinFile,
        renderVars: mockRenderVars,
        tooltip: `Open '${newWinLabel}' in a new window`,
        type: buttons[1].key,
      },
    ])
  })
})
