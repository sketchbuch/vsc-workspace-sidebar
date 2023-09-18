import { expect } from 'chai'
import { FS_WS_FILETYPE } from '../../../../../constants/fs'
import { getLangIcon } from '../../../../../webviews/Workspace/helpers/getLangIcon'

interface GetFile {
  fileName?: string
  folder?: string
}

suite.only('Webviews > Workspace > Helpers > getLangIcon():', () => {
  const NAME = 'py'
  const FILE_NAME = `${NAME}-app-google`
  const PATH = 'python'
  const OS_HOME = '/home/user'
  const CONFIG_FOLDER = `${OS_HOME}/dev`

  const getFile = ({ fileName = FILE_NAME, folder = PATH }: GetFile): string => {
    return `${CONFIG_FOLDER}/${folder}/${fileName}.${FS_WS_FILETYPE}`
  }

  test('Returns empty string if fileIconKeys is empty', () => {
    const file = getFile({ fileName: FILE_NAME, folder: PATH })
    const result = getLangIcon(file, {})
    expect(result).to.eql('')
  })

  test('Returns "file" fallback if file icon is found', () => {
    const file = getFile({ fileName: FILE_NAME, folder: PATH })
    const result = getLangIcon(file, { file: NAME })
    expect(result).to.eql('file')
  })

  suite('fileExtensions:', () => {
    test('Returns "workspace" fallback if workspace icon is found', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: ['workspace'],
        languageIds: [],
      })
      expect(result).to.eql('workspace')
    })

    test('Returns correct icon when matched to name', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [NAME],
        languageIds: [],
      })
      expect(result).to.eql(NAME)
    })

    test('Returns correct icon when matched to path', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [PATH],
        languageIds: [],
      })
      expect(result).to.eql(PATH)
    })

    test('Prioritises matches in names over matches in paths', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [NAME, PATH],
        languageIds: [],
      })
      expect(result).to.eql(NAME)
    })

    test('Prioritises path matches in deeper folders', () => {
      const DEEPER_PATH = 'typescript'
      const file = getFile({ fileName: FILE_NAME, folder: `${PATH}/${DEEPER_PATH}` })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [PATH, DEEPER_PATH],
        languageIds: [],
      })
      expect(result).to.eql(DEEPER_PATH)
    })
  })

  suite('languageIds:', () => {
    test('Returns "workspace" fallback if workspace icon is found', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [],
        languageIds: ['workspace'],
      })
      expect(result).to.eql('workspace')
    })

    test('Returns correct icon when matched to name', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [],
        languageIds: [NAME],
      })
      expect(result).to.eql(NAME)
    })

    test('Returns correct icon when matched to path', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [],
        languageIds: [PATH],
      })
      expect(result).to.eql(PATH)
    })

    test('Prioritises matches in names over matches in paths', () => {
      const file = getFile({ fileName: FILE_NAME, folder: PATH })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [],
        languageIds: [NAME, PATH],
      })
      expect(result).to.eql(NAME)
    })

    test('Prioritises path matches in deeper folders', () => {
      const DEEPER_PATH = 'typescript'
      const file = getFile({ fileName: FILE_NAME, folder: `${PATH}/${DEEPER_PATH}` })
      const result = getLangIcon(file, {
        file: NAME,
        fileExtensions: [],
        languageIds: [PATH, DEEPER_PATH],
      })
      expect(result).to.eql(DEEPER_PATH)
    })
  })
})
