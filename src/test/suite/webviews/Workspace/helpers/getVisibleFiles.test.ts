import { expect } from 'chai'
import * as sinon from 'sinon'
import * as listConfigs from '../../../../../config/listview'
import * as treeConfigs from '../../../../../config/treeview'
import { ConfigShowPaths } from '../../../../../constants/config'
import { getVisibleFiles } from '../../../../../webviews/Workspace/helpers/getVisibleFiles'
import { Files } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface'
import {
  file1,
  file2,
  file3,
  file4,
  FOLDER1,
  getMockConvertedFiles,
  SEARCH_TERM,
  SEARCH_TERM_LOWERCASE,
} from '../../../../mocks/mockFileData'
import { getMockSearchState } from '../../../../mocks/mockState'

suite('Webviews > Workspace > Helpers > getVisibleFiles():', () => {
  const filesUnsorted = getMockConvertedFiles()
  const filesSorted = [{ ...file4 }, { ...file2 }, { ...file3 }, { ...file1 }]

  let treeConfigStub: sinon.SinonStub
  let pathsConfigStub: sinon.SinonStub

  setup(() => {
    treeConfigStub = sinon.stub(treeConfigs, 'getShowTreeConfig').callsFake(() => false)
    pathsConfigStub = sinon
      .stub(listConfigs, 'getShowPathsConfig')
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
          getMockSearchState({ caseInsensitive: false, term: SEARCH_TERM_LOWERCASE })
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when case sensitive and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: false, term: SEARCH_TERM })
        )

        expect(result).to.eql([file4])
      })

      test('Search correctly filters when case insensitive and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: true, term: 'No Match' })
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when case insensitive and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ caseInsensitive: true, term: SEARCH_TERM })
        )
        expect(result).to.eql([file4])
      })
    })

    suite('matchStart:', () => {
      test('Search correctly filters when matchStart and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: true, term: 'Extension' })
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when matchStart and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: true, term: 'Some' })
        )

        expect(result).to.eql([file2])
      })

      test('Search correctly filters when not matchStart and there is not a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: false, term: 'No Match' })
        )

        expect(result).to.eql([])
      })

      test('Search correctly filters when not matchStart and there is a match', () => {
        const result = getVisibleFiles(
          filesUnsorted,
          getMockSearchState({ matchStart: false, term: 'Extension' })
        )

        expect(result).to.eql([file2])
      })
    })
  })

  suite('Show paths:', () => {
    test('"Never" returns files with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.NEVER)
      const expectedFiles = filesSorted.map((file) => {
        return { ...file, showPath: false }
      })

      const result = getVisibleFiles(filesUnsorted, getMockSearchState())
      expect(result).to.eql(expectedFiles)
    })

    test('"Always" returns files with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.ALWAYS)
      const expectedFiles = filesSorted.map((file) => {
        return { ...file, showPath: true }
      })

      const result = getVisibleFiles(filesUnsorted, getMockSearchState())
      expect(result).to.eql(expectedFiles)
    })

    test('"As needed" returns files with showPath: "true" for files with duplicate labels', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.AS_NEEEDED)

      const files = filesUnsorted.map((file) => {
        if (file.path.includes(FOLDER1)) {
          return { ...file, cleanedLabel: 'Same label', label: 'Same label' }
        }

        return { ...file }
      })

      const expectedFiles: Files = [
        { ...getMockConvertedFiles()[3], showPath: false },
        {
          ...getMockConvertedFiles()[0],
          showPath: true,
          cleanedLabel: 'Same label',
          label: 'Same label',
        },
        {
          ...getMockConvertedFiles()[1],
          showPath: true,
          cleanedLabel: 'Same label',
          label: 'Same label',
        },
        { ...getMockConvertedFiles()[2], showPath: false },
      ]

      const result = getVisibleFiles(files, getMockSearchState())
      expect(result).to.eql(expectedFiles)
    })
  })
})
