import { expect } from 'chai'
import * as path from 'path'
import { FS_WS_FILETYPE } from '../../../constants/fs'
import { getLangIcon } from '../../../theme/getLangIcon'
import { FileIconKeys } from '../../../webviews/webviews.interface'

interface GetFile {
  fileName?: string
  folder?: string
}

suite('Themes > getLangIcon():', () => {
  const NAME = 'py'
  const FILE_NAME = `${NAME}-app-google`
  const PATH = 'python'
  const OS_HOME = path.join('home', 'user')
  const CONFIG_FOLDER = path.join(OS_HOME, 'dev')

  const getFile = ({ fileName = FILE_NAME, folder = PATH }: GetFile): string => {
    return path.join(CONFIG_FOLDER, folder, `${fileName}.${FS_WS_FILETYPE}`)
  }

  const testThemeIcons = (themeElement: 'fileExtensions' | 'languageIds') => {
    const baseFileIconKeys: FileIconKeys = {
      file: NAME,
      fileExtensions: [],
      languageIds: [],
    }

    test('Returns "workspace" fallback if workspace icon is found', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        [themeElement]: ['workspace'],
      })
      expect(result).to.eql('workspace')
    })

    test('Returns correct icon when matched to name', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        [themeElement]: [NAME],
      })
      expect(result).to.eql(NAME)
    })

    test('Returns correct icon when matched to path', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        [themeElement]: [PATH],
      })
      expect(result).to.eql(PATH)
    })

    test('Prioritises matches in names over matches in paths', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        [themeElement]: [NAME, PATH],
      })
      expect(result).to.eql(NAME)
    })

    test('Prioritises path matches in deeper folders', () => {
      const DEEPER_PATH = 'typescript'
      const file = getFile({ fileName: FILE_NAME, folder: `${PATH}/${DEEPER_PATH}` })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        [themeElement]: [PATH, DEEPER_PATH],
      })
      expect(result).to.eql(DEEPER_PATH)
    })

    test('Returns correct custom icon when matched to name', () => {
      const CUSTOM_MATCH = 'reacttypescript'
      const file = getFile({ fileName: `${CUSTOM_MATCH}-some-name`, folder: 'some-folder' })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        custom: {
          [NAME]: [CUSTOM_MATCH],
        },
        [themeElement]: [NAME, PATH],
      })
      expect(result).to.eql(NAME)
    })

    test('Returns correct custom icon when matched to path', () => {
      const CUSTOM_MATCH = 'reacttypescript'
      const file = getFile({ fileName: `some-name`, folder: `some-folder/${CUSTOM_MATCH}/test` })
      const result = getLangIcon(file, {
        ...baseFileIconKeys,
        custom: {
          [NAME]: [CUSTOM_MATCH],
        },
        [themeElement]: [NAME, PATH],
      })
      expect(result).to.eql(NAME)
    })
  }

  test('Returns empty string if fileIconKeys is empty', () => {
    const file = getFile({ fileName: FILE_NAME, folder: PATH })
    const result = getLangIcon(file, {})
    expect(result).is.empty
  })

  test('Returns "file" fallback if file icon is found', () => {
    const file = getFile({ fileName: FILE_NAME, folder: PATH })
    const result = getLangIcon(file, { file: NAME })
    expect(result).to.eql('file')
  })

  suite('fileExtensions:', () => {
    testThemeIcons('fileExtensions')
  })

  suite('languageIds:', () => {
    testThemeIcons('languageIds')
  })
})
