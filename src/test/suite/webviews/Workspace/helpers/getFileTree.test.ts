import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import * as condense from '../../../../../webviews/Workspace/helpers/condenseTree';
import { getFileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import { getMockFileTree, getMockVisibleFiles, ROOT_FOLDER } from '../../../../mocks/mockFileData';

suite('Webviews > Workspace > Helpers > getFileTree():', () => {
  let condenseConfigStub: sinon.SinonStub;
  let condenseSpy: sinon.SinonSpy;
  let folderConfigStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true);
    condenseSpy = sinon.spy(condense, 'condenseTree');
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER);
  });

  teardown(() => {
    condenseConfigStub.restore();
    condenseSpy.restore();
    folderConfigStub.restore();
  });

  test('Returns the expected filetree', () => {
    condenseConfigStub.callsFake(() => false);

    const result = getFileTree(getMockVisibleFiles());
    expect(result).to.eql(getMockFileTree('normal'));

    sinon.assert.notCalled(condenseSpy);
  });

  test('Returns the expected condensed filetree', () => {
    const result = getFileTree(getMockVisibleFiles());
    expect(result).to.eql(getMockFileTree('condensed'));

    sinon.assert.callCount(condenseSpy, 5);
  });
});
