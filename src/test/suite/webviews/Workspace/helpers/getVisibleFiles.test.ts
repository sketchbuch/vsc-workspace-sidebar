import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { ConfigShowPaths } from '../../../../../constants/config';
import { getVisibleFiles } from '../../../../../webviews/Workspace/helpers/getVisibleFiles';
import { file4, FOLDER1, getMockConvertedFiles, SEARCH_TERM } from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getVisibleFiles():', () => {
  const filesUnsorted = getMockConvertedFiles();
  const filesAsc = getMockConvertedFiles('asc');
  const filesDesc = getMockConvertedFiles('desc');

  let treeConfigStub: sinon.SinonStub;
  let pathsConfigStub: sinon.SinonStub;

  setup(() => {
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
    pathsConfigStub = sinon
      .stub(configs, 'getShowPathsConfig')
      .callsFake(() => ConfigShowPaths.ALWAYS);
  });

  teardown(() => {
    treeConfigStub.restore();
    pathsConfigStub.restore();
  });

  test('Search correctly filters', () => {
    const result = getVisibleFiles(filesUnsorted, SEARCH_TERM, 'ascending');
    expect(result).to.eql([file4]);
  });

  suite('Sorting:', () => {
    test('Correctly sorts "ascending"', () => {
      const result = getVisibleFiles(filesUnsorted, '', 'ascending');
      expect(result).to.eql(filesAsc);
    });

    test('Correctly sorts "descending"', () => {
      const result = getVisibleFiles(filesUnsorted, '', 'descending');
      expect(result).to.eql(filesDesc);
    });

    test('No sorting when using tree view', () => {
      treeConfigStub.callsFake(() => true);

      const result = getVisibleFiles(filesDesc, '', 'ascending');
      expect(result).to.eql(filesDesc);

      const resultDescending = getVisibleFiles(filesAsc, '', 'descending');
      expect(resultDescending).to.eql(filesAsc);
    });
  });

  suite('Show paths:', () => {
    test('"Never" returns filesAsc with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.NEVER);
      const expectedFiles = filesAsc.map((file) => {
        return { ...file, showPath: false };
      });

      const result = getVisibleFiles(filesAsc, '', 'ascending');
      expect(result).to.eql(expectedFiles);
    });

    test('"Always" returns filesAsc with showPath: "false"', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.ALWAYS);

      const result = getVisibleFiles(filesAsc, '', 'ascending');
      expect(result).to.eql(filesAsc);
    });

    test('"As needed" returns files with showPath: "true" for files with duplicate labels', () => {
      pathsConfigStub.callsFake(() => ConfigShowPaths.AS_NEEEDED);

      const files = filesUnsorted.map((file) => {
        if (file.path.includes(FOLDER1)) {
          return { ...file, label: 'Same label' };
        }

        return { ...file };
      });

      const expectedFiles = [
        { ...getMockConvertedFiles()[3], showPath: false },
        {
          ...getMockConvertedFiles()[0],
          showPath: true,
          label: 'Same label',
        },
        {
          ...getMockConvertedFiles()[1],
          showPath: true,
          label: 'Same label',
        },
        { ...getMockConvertedFiles()[2], showPath: false },
      ];

      const result = getVisibleFiles(files, '', 'ascending');
      expect(result).to.eql(expectedFiles);
    });
  });
});
