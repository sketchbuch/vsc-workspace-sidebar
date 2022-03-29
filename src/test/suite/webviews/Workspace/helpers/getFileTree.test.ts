import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import * as condense from '../../../../../webviews/Workspace/helpers/condenseTree';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import {
  mockCondensedFileTree,
  mockFileTree,
  mockVisibleFiles,
  ROOT_FOLDER,
} from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  let condenseConfigStub: sinon.SinonStub;
  let condenseSpy: sinon.SinonSpy;
  let treeStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
    condenseSpy = sinon.spy(condense, 'condenseTree');
    treeStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER);
  });

  teardown(() => {
    condenseConfigStub.restore();
    condenseSpy.restore();
    treeStub.restore();
  });

  test('Returns the expected filetree', () => {
    const result = getFileTree(mockVisibleFiles);
    expect(result).to.eql(mockFileTree);

    sinon.assert.notCalled(condenseSpy);
  });

  test('Returns the expected condensed filetree', () => {
    condenseConfigStub.callsFake(() => true);

    const result = getFileTree(mockVisibleFiles);
    expect(result).to.eql(mockCondensedFileTree);

    sinon.assert.callCount(condenseSpy, 5);
  });
});
