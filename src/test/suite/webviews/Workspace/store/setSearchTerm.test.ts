import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { setSearchTerm } from '../../../../../webviews/Workspace/store/setSearchTerm';
import {
  file4,
  getMockConvertedFiles,
  getMockFileList,
  getMockFileTree,
  getMockFolderList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
  SEARCH_TERM,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setSearchTerm()', () => {
  let compactConfigStub: sinon.SinonStub;
  let condenseConfigStub: sinon.SinonStub;
  let folderConfigStub: sinon.SinonStub;
  let treeConfigStub: sinon.SinonStub;

  setup(() => {
    compactConfigStub = sinon
      .stub(configs, 'getExplorerCompactFoldersConfig')
      .callsFake(() => true);
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true);
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH);
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    compactConfigStub.restore();
    condenseConfigStub.restore();
    folderConfigStub.restore();
    treeConfigStub.restore();
  });

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      files: [],
      fileTree: getMockFileTree('normal'),
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });
    const expectedState = getMockState({
      search: SEARCH_TERM,
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree uncompacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false);
    condenseConfigStub.callsFake(() => false);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('searched'),
      search: SEARCH_TERM,
      treeFolders: getMockFolderList('searched'),
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree uncompacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => false);
    condenseConfigStub.callsFake(() => true);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed-searched'),
      search: SEARCH_TERM,
      treeFolders: getMockFolderList('condensed-searched'),
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree compacted & uncondensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true);
    condenseConfigStub.callsFake(() => false);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-searched'),
      search: SEARCH_TERM,
      treeFolders: getMockFolderList('compacted-searched'),
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree compacted & condensed - updates state as expected', () => {
    compactConfigStub.callsFake(() => true);
    condenseConfigStub.callsFake(() => true);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('compacted-condensed-searched'),
      search: SEARCH_TERM,
      treeFolders: getMockFolderList('compacted-condensed-searched'),
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'ascending',
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      search: SEARCH_TERM,
      sort: 'ascending',
      treeFolders: [],
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'descending',
      search: '',
      visibleFiles: getMockVisibleFiles(),
    });

    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      search: SEARCH_TERM,
      sort: 'descending',
      treeFolders: [],
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });
});
