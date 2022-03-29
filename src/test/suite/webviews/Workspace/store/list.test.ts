import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { list } from '../../../../../webviews/Workspace/store/list';
import {
  mockCondensedFileTree,
  mockConvertedFiles,
  mockFileList,
  mockFileTree,
  mockVisibleFiles,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > list()', () => {
  let condenseStub: sinon.SinonStub;

  setup(() => {
    condenseStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    condenseStub.restore();
  });

  test('Invalid folder updates state as expected', () => {
    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: mockVisibleFiles,
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
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      fileTree: mockFileTree,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: mockFileList,
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Valid folder condensed updates state as expected', () => {
    condenseStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      fileTree: mockCondensedFileTree,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: mockFileList,
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });
});
