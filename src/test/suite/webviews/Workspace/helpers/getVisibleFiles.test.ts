import { expect } from 'chai'
import * as sinon from 'sinon'
import * as configs from '../../../../../config/getConfig'
import { ConfigShowPaths } from '../../../../../constants/config'
import { getVisibleFiles } from '../../../../../webviews/Workspace/helpers/getVisibleFiles'
import {
  file2,
  file4,
  FOLDER1,
  getMockConvertedFiles,
  SEARCH_TERM,
  SEARCH_TERM_LOWERCASE
} from '../../../../mocks/mockFileData'
import { getMockSearchState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Helpers > getVisibleFiles():', () => {
  const filesUnsorted = getMockConvertedFiles()
  const filesAsc = getMockConvertedFiles('asc')
  const filesDesc = getMockConvertedFiles('desc')

  let treeConfigStub: sinon.SinonStub
  let pathsConfigStub: sinon.SinonStub

  setup(() => {
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false)
    pathsConfigStub = sinon
      .stub(configs, 'getShowPathsConfig')
      .callsFake(() => ConfigShowPaths.ALWAYS)
  })

  teardown(() => {
    treeConfigStub.restore()
    pathsConfigStub.restore()
  })

  suite('Search:', () => {
    suite('caseInsensitive:', () => {
      test('Search correctly filters when case sensitive and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: false, term: SEARCH_TERM_LOWERCASE }),
          'ascending'
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when case sensitive and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: false, term: SEARCH_TERM }),
          'ascending'
        )

        expect(result).to.eql([file4])
      })

      test('Search correctly filters when case insensitive and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: true, term: 'No Match' }),
          'ascending'
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when case insensitive and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: true, term: SEARCH_TERM }),
          'ascending'
        )
        expect(result).to.eql([file4])
      })
    })

    suite('matchStart:', () => {
      test('Search correctly filters when matchStart and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: true, term: 'Extension' }),
          'ascending'
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when matchStart and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: true, term: 'Some' }),
          'ascending'
        )

        expect(result).to.eql([file2])
      })

      test('Search correctly filters when not matchStart and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: false, term: 'No Match' }),
          'ascending'
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when not matchStart and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: false, term: 'Extension' }),
          'ascending'
        )

        expect(result).to.eql([file2])
      })
    })
  })

  suite('Sorting:', () => {
    test('Correctly sorts "ascending"', () => {
      const result = getVisibleFiles(filesUnsorted, getMockSearchState(), 'ascending')
      expect(result).to.eql(filesAsc)
    })

    test('Correctly sorts "descending"', () => {
      const result = getVisibleFiles(filesUnsorted, getMockSearchState(), 'descending')
      expect(result).to.eql(filesDesc)
    })

    test('No sorting when using tree view', () => {
      treeConfigStub.callsFake(() => true)

      const result = getVisibleFiles(filesDesc, getMockSearchState(), 'ascending')
      expect(result).to.eql(filesDesc)

      const resultDescending = getVisibleFiles(filesAsc, getMockSearchState(), 'descending')
      expect(resultDescending).to.eql(filesAsc)
    })
  })

  suite('Show paths:', () => {
    test('"Never" returns filesAsc with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.NEVER)
      const expectedFiles = filesAsc.map((file) => {
        return { ...file, showPath: false }
      })

      const result = getVisibleFiles(filesAsc, getMockSearchState(), 'ascending')
      expect(result).to.eql(expectedFiles)
    })

    test('"Always" returns filesAsc with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.ALWAYS)

      const result = getVisibleFiles(filesAsc, getMockSearchState(), 'ascending')
      expect(result).to.eql(filesAsc)
    })

    test('"As needed" returns files with showPath: "true" for files with duplicate labels', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.AS_NEEEDED)

      const files = filesUnsorted.map((file) => {
        if (file.path.includes(FOLDER1)) {
          return { ...file, label: 'Same label' }
        }

        return { ...file }
      })

      const expectedFiles = [
        { ...getMockConvertedFiles()[3], showPath: false },
        {
          ...getMockConvertedFiles()[0],
          showPath: true,
          label: 'Same label'
        },
        {
          ...getMockConvertedFiles()[1],
          showPath: true,
          label: 'Same label'
        },
        { ...getMockConvertedFiles()[2], showPath: false }
      ]

      const result = getVisibleFiles(files, getMockSearchState(), 'ascending')
      expect(result).to.eql(expectedFiles)
    })
  })
})
