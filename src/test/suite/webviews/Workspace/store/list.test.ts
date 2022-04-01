import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { list } from '../../../../../webviews/Workspace/store/list';
import {
  getMockFileTree,
  getMockVisibleFiles,
  getMockConvertedFiles,
  getMockFileList,
  ROOT_FOLDER_PATH,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > list()', () => {
  let condenseConfigStub: sinon.SinonStub;
  let folderConfigStub: sinon.SinonStub;
  let treeConfigStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH);
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => true);
  });

  teardown(() => {
    condenseConfigStub.restore();
    folderConfigStub.restore();
    treeConfigStub.restore();
  });

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: getMockVisibleFiles(),
    });
    const expectedState = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: true,
      state: 'invalid',
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    list(state, { payload: false, type: 'ws/list' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder (condensed) updates state as expected', () => {
    condenseConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed'),
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });
});
