import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { setSearchTerm } from '../../../../../webviews/Workspace/store/setSearchTerm';
import {
  file4,
  mockCondensedFileTreeSearched,
  mockConvertedFiles,
  mockFileList,
  mockFileTree,
  mockFileTreeSearched,
  mockVisibleFiles,
  SEARCH_TERM,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setSearchTerm()', () => {
  let condenseStub: sinon.SinonStub;

  setup(() => {
    condenseStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    condenseStub.restore();
  });

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      files: false,
      fileTree: mockFileTree,
      search: '',
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      search: SEARCH_TERM,
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      search: '',
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      fileTree: mockFileTreeSearched,
      files: mockFileList,
      search: SEARCH_TERM,
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder (condensed) updates state as expected', () => {
    condenseStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      search: '',
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      fileTree: mockCondensedFileTreeSearched,
      files: mockFileList,
      search: SEARCH_TERM,
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: SEARCH_TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });
});
