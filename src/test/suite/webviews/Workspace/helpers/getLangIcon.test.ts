import { expect } from 'chai'
import { FS_WS_FILETYPE } from '../../../../../constants/fs'
import { getLangIcon } from '../../../../../webviews/Workspace/helpers/getLangIcon'

interface GetFile {
  fileName?: string
  folder?: string
}

suite('Webviews > Workspace > Helpers > getLangIcon():', () => {
  const FILE_NAME = `flutter-app-google`
  const PATH = 'flutter'
  const OS_HOME = '/home/user'
  const CONFIG_FOLDER = `${OS_HOME}/dev`

  const getFile = ({ fileName = FILE_NAME, folder = PATH }: GetFile): string => {
    return `${CONFIG_FOLDER}/${folder}/${fileName}.${FS_WS_FILETYPE}`
  }

  test('Returns empty string if a language match is not found', () => {
    const result = getLangIcon(getFile({ fileName: 'some-workspace', folder: 'some_folder' }))
    expect(result).to.eql('')
  })

  test('Returns "flutter" if a language match is found in the file name', () => {
    const result = getLangIcon(getFile({ folder: 'some_folder' }))
    expect(result).to.eql(PATH)
  })

  test('Returns "flutter" if a language match is found in the file path', () => {
    const result = getLangIcon(getFile({ fileName: 'react-app' }))
    expect(result).to.eql(PATH)
  })
})
