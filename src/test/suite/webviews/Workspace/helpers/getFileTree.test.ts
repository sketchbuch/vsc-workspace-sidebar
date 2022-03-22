import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import { mockFilesForFileTree, mockFileTree, ROOT_FOLDER } from '../../../../mocks/mockFileTree';

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  let treeStub: sinon.SinonStub;

  setup(() => {
    treeStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER);
  });

  teardown(() => {
    treeStub.restore();
  });

  test('Returns expected filetree', () => {
    const result = getFileTree(mockFilesForFileTree);
    expect(result).to.eql(mockFileTree);
  });
});
