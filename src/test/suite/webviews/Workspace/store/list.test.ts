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
  getMockFolderList,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > list()', () => {
  let condenseConfigStub: sinon.SinonStub;
  let folderConfigStub: sinon.SinonStub;
  let treeConfigStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true);
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH);
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    condenseConfigStub.restore();
    folderConfigStub.restore();
    treeConfigStub.restore();
  });

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: [],
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: getMockVisibleFiles(),
    });
    const expectedState = getMockState({
      convertedFiles: [],
      files: [],
      isFolderInvalid: true,
      state: 'invalid',
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    list(state, { payload: [], type: 'ws/list' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree - updates state as expected', () => {
    condenseConfigStub.callsFake(() => false);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: [],
      files: [],
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
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree condensed - updates state as expected', () => {
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: [],
      files: [],
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
      treeFolders: getMockFolderList('condensed'),
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - flat list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: [],
      isFolderInvalid: false,
      sort: 'ascending',
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      isFolderInvalid: false,
      sort: 'ascending',
      state: 'list',
      visibleFiles: getMockVisibleFiles('asc'),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - flat list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: [],
      isFolderInvalid: false,
      sort: 'descending',
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      isFolderInvalid: false,
      sort: 'descending',
      state: 'list',
      visibleFiles: getMockVisibleFiles('desc'),
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: getMockFileList(),
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });
});
