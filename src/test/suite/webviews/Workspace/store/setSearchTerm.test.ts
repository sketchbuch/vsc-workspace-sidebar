import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { setSearchTerm } from '../../../../../webviews/Workspace/store/setSearchTerm';
import { getDefaultFileTree } from '../../../../../webviews/Workspace/store/workspaceSlice';
import {
  file4,
  getMockFileTree,
  getMockConvertedFiles,
  getMockFileList,
  getMockVisibleFiles,
  ROOT_FOLDER_PATH,
  SEARCH_TERM,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setSearchTerm()', () => {
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
      files: false,
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

  test('Valid folder - tree - updates state as expected', () => {
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
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - tree condensed - updates state as expected', () => {
    condenseConfigStub.callsFake(() => true);

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
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - list asc - updates state as expected', () => {
    treeConfigStub.callsFake(() => false);

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
      fileTree: getDefaultFileTree(),
      search: SEARCH_TERM,
      sort: 'ascending',
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder - list desc - updates state as expected', () => {
    treeConfigStub.callsFake(() => false);

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
      fileTree: getDefaultFileTree(),
      search: SEARCH_TERM,
      sort: 'descending',
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });
});
