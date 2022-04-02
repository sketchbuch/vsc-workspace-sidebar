import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { getAllFoldersFromTree } from '../../../../../webviews/Workspace/helpers/getAllFoldersFromTree';
import {
  getMockFileTree,
  getMockFolderList,
  ROOT_FOLDER_PATH,
} from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getAllFoldersFromTree():', () => {
  let condenseConfigStub: sinon.SinonStub;
  let folderConfigStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true);
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH);
  });

  teardown(() => {
    condenseConfigStub.restore();
    folderConfigStub.restore();
  });

  test('Returns expected folder list', () => {
    const tree = getMockFileTree('normal');
    const result = getAllFoldersFromTree(tree);
    const expected = getMockFolderList();

    expect(result).to.eql(expected);
  });
});
