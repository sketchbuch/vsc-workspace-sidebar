import { expect } from 'chai';
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../../webviews/Workspace/store/fetch';
import {
  mockConvertedFiles,
  mockFileList,
  mockFileTree,
  mockVisibleFiles,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > fetch()', () => {
  test('Pending updates state as expected', () => {
    const state = getMockState({
      isFolderInvalid: true,
      state: 'invalid',
    });
    const expectedState = getMockState({
      isFolderInvalid: false,
      state: 'loading',
    });

    expect(state).not.to.eql(expectedState);
    fetchPending(state);
    expect(state).to.eql(expectedState);
  });

  test('Rejected updates state as expected', () => {
    const state = getMockState({
      error: '',
      state: 'invalid',
    });
    const expectedState = getMockState({
      error: 'FETCH',
      state: 'error',
    });

    expect(state).not.to.eql(expectedState);
    fetchRejected(state);
    expect(state).to.eql(expectedState);
  });

  test('Fulfilled (invalid folder) updates state as expected', () => {
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
    fetchFulfilled(state, {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: false,
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('Fulfilled (valid folder) updates state as expected', () => {
    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: true,
      state: 'invalid',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      fileTree: mockFileTree,
      files: mockFileList,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    fetchFulfilled(state, {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: mockFileList,
      type: 'ws/list',
    });
    expect(state.visibleFiles).to.eql(expectedState.visibleFiles);
  });
});
