import { expect } from 'chai'
import {
  ConfigButtons,
  getWorkspaceButtons
} from '../../../../templates/helpers/getWorkspaceButtons'
import { getMockRenderVars } from '../../../mocks/mockRenderVars'

suite('Templates > Helpers > getWorkspaceButtons():', () => {
  const mockRenderVars = getMockRenderVars()

  test('Returns an empty array if no button data', () => {
    expect(
      getWorkspaceButtons({
        buttons: [],
        renderVars: mockRenderVars
      })
    ).to.eql([])
  })

  test('Returns expected buttons if there is button data', () => {
    const newWinFile = '/sdcsdc/dcdsc'
    const newWinLabel = 'scddscsd'

    const buttons: ConfigButtons = [
      {
        key: 'open-filemanager',
        file: newWinFile,
        label: newWinLabel
      },
      {
        key: 'new-window',
        file: {
          file: newWinFile,
          isSelected: false,
          label: newWinLabel,
          path: '/sdcsdc/dcdsc',
          showPath: false
        }
      }
    ]

    expect(
      getWorkspaceButtons({
        buttons,
        renderVars: mockRenderVars
      })
    ).to.eql([
      {
        ariaLabel: `Open folder containing '${newWinLabel}' in your file manager`,
        file: buttons[0].file,
        renderVars: mockRenderVars,
        tooltip: `Open '${newWinLabel}' in your file manager`,
        type: buttons[0].key
      },
      {
        ariaLabel: `Open '${newWinLabel}' in a new window`,
        file: newWinFile,
        renderVars: mockRenderVars,
        tooltip: `Open '${newWinLabel}' in a new window`,
        type: buttons[1].key
      }
    ])
  })
})
