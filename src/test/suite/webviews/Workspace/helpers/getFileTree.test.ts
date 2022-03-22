import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { CONFIG_FOLDER } from '../../../../../constants/config';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import { mockFilesForFileTree, mockFileTree } from '../../../../mocks/mockFileTree';

suite.only('Webviews > Workspace > Helpers > getFileTree():', () => {
  let treeStub: sinon.SinonStub;

  setup(() => {
    treeStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => CONFIG_FOLDER);
  });

  teardown(() => {
    treeStub.restore();
  });

  test('Returns expected filetree', () => {
    const result = getFileTree(mockFilesForFileTree);
    expect(result).to.eql(mockFileTree);
  });
});
