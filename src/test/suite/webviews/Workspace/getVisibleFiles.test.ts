import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../config/getConfig';
import { ConfigShowPaths } from '../../../../constants';
import { getVisibleFiles } from '../../../../webviews/Workspace/helpers/getVisibleFiles';
import { getMockFiles } from '../../../mocks';

suite('Webviews > Workspace > getVisibleFiles():', () => {
  const options = { showPath: false };
  let treeStub: sinon.SinonStub;
  let pathsStub: sinon.SinonStub;

  setup(() => {
    treeStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
    pathsStub = sinon.stub(configs, 'getShowPathsConfig');
  });

  teardown(() => {
    treeStub.restore();
    pathsStub.restore();
  });

  test('Search correctly filters', () => {
    const files = getMockFiles(2);
    const result = getVisibleFiles(files, '2', 'ascending');

    expect(result).to.eql([files[1]]);
  });

  suite('Sorting:', () => {
    test('Corectly sorts "ascending"', () => {
      const files = getMockFiles(2).reverse();
      const expectedFiles = getMockFiles(2);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(expectedFiles);
    });

    test('Corectly sorts "descending"', () => {
      const files = getMockFiles(2);
      const expectedFiles = getMockFiles(2).reverse();
      const result = getVisibleFiles(files, '', 'descending');

      expect(result).to.eql(expectedFiles);
    });

    test('No sorting when using tree view', () => {
      treeStub.callsFake(() => true);

      const files = getMockFiles(2).reverse();
      const expectedFiles = getMockFiles(2).reverse();
      const result = getVisibleFiles(files, '', 'ascending');
      expect(result).to.eql(expectedFiles);

      const filesDescending = getMockFiles(2);
      const expectedFilesDescending = getMockFiles(2);
      const resultDescending = getVisibleFiles(filesDescending, '', 'descending');
      expect(resultDescending).to.eql(expectedFilesDescending);
    });
  });

  suite('Show paths:', () => {
    test('"Never" returns files with showPath: "false"', () => {
      pathsStub.callsFake(() => ConfigShowPaths.NEVER);

      const files = getMockFiles(2);
      const expectedFiles = getMockFiles(2, options);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(expectedFiles);
    });

    test('"Always" returns files with showPath: "false"', () => {
      pathsStub.callsFake(() => ConfigShowPaths.ALWAYS);

      const files = getMockFiles(2);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(files);
    });

    test('"As needed" returns files with showPath: "true" for files with duplicate labels', () => {
      pathsStub.callsFake(() => ConfigShowPaths.AS_NEEEDED);

      const files = getMockFiles(3);
      files[2].label = files[0].label;
      files[1].showPath = false;
      const expectedFiles = getMockFiles(3);
      expectedFiles[2].label = expectedFiles[0].label;
      expectedFiles[1].showPath = false;
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql([expectedFiles[0], expectedFiles[2], expectedFiles[1]]);
    });
  });
});
