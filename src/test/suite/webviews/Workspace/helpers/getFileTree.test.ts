import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import * as ft from '../../../../../webviews/Workspace/helpers/getFileTree';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import {
  mockCondensedFileTree,
  mockFileTree,
  mockVisibleFiles,
  ROOT_FOLDER,
} from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  let condenseStub: sinon.SinonStub;
  let ftSpy: sinon.SinonSpy;
  let treeStub: sinon.SinonStub;

  setup(() => {
    condenseStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
    ftSpy = sinon.spy(ft, 'condenseTree');
    treeStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER);
  });

  teardown(() => {
    condenseStub.restore();
    ftSpy.restore();
    treeStub.restore();
  });

  test('Returns the expected filetree', () => {
    const result = getFileTree(mockVisibleFiles);
    expect(result).to.eql(mockFileTree);

    sinon.assert.notCalled(ftSpy);
  });

  test('Returns the expected condensed filetree', () => {
    condenseStub.callsFake(() => true);

    const result = getFileTree(mockVisibleFiles);
    expect(result).to.eql(mockCondensedFileTree);

    sinon.assert.callCount(ftSpy, 5);
  });
});
