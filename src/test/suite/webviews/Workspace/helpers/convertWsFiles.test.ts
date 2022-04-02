import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { convertWsFiles } from '../../../../../webviews/Workspace/helpers/convertWsFiles';
import { Files } from '../../../../../webviews/Workspace/WorkspaceViewProvider.interface';

suite('Webviews > Workspace > Helpers > convertWsFiles():', () => {
  let cleanLabelsConfigStub: sinon.SinonStub;

  const FILE_NAME1 = 'First Project';
  const FILE_NAME2 = 'Second_WORK-Space';
  const FILE1 = `${FILE_NAME1}.code-workspace`;
  const FILE_PATH2 = `some/folder`;
  const FILE2 = `/${FILE_PATH2}/${FILE_NAME2}.code-workspace`;
  const files = [FILE1, 'Wrong.ext', FILE2];

  const expected: Files = [
    {
      file: FILE1,
      isSelected: false,
      label: 'First Project',
      path: '',
      searchLabel: 'first project',
      showPath: true,
    },
    {
      file: FILE2,
      isSelected: false,
      label: 'Second Work Space',
      path: FILE_PATH2,
      searchLabel: 'second work space',
      showPath: true,
    },
  ];

  setup(() => {
    cleanLabelsConfigStub = sinon.stub(configs, 'getCleanLabelsConfig').callsFake(() => true);
  });

  teardown(() => {
    cleanLabelsConfigStub.restore();
  });

  test('Returns an empty array if no files', () => {
    expect(convertWsFiles([], '')).to.eql([]);
  });

  test('Converts the files with cleaned labels', () => {
    cleanLabelsConfigStub.callsFake(() => true);
    expect(convertWsFiles(files, '')).to.eql(expected);
  });

  test('Converts the files without cleaning the labels', () => {
    cleanLabelsConfigStub.callsFake(() => false);
    const expectedUncleaned: Files = [
      { ...expected[0], label: FILE_NAME1, searchLabel: FILE_NAME1.toLowerCase() },
      { ...expected[1], label: FILE_NAME2, searchLabel: FILE_NAME2.toLowerCase() },
    ];
    expect(convertWsFiles(files, '')).to.eql(expectedUncleaned);
  });
});
