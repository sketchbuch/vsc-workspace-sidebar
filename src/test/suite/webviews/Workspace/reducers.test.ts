import { expect } from 'chai';
import { FS_WS_FILETYPE } from '../../../../constants';
import { error } from '../../../../webviews/Workspace/store/error';
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../webviews/Workspace/store/fetch';
import { invalid } from '../../../../webviews/Workspace/store/invalid';
import { list } from '../../../../webviews/Workspace/store/list';
import { loading } from '../../../../webviews/Workspace/store/loading';
import { setPersistedState } from '../../../../webviews/Workspace/store/setPersistedState';
import { setSearchTerm } from '../../../../webviews/Workspace/store/setSearchTerm';
import { setShowPaths } from '../../../../webviews/Workspace/store/setShowPaths';
import { getMockFiles, getMockState } from '../../../mocks';

suite('Webviews > Workspace > reducers:', () => {
  const visibleFiles = getMockFiles(2, { fileType: FS_WS_FILETYPE });
  const files = [visibleFiles[0].file, visibleFiles[1].file];
  const TERM = 'file';

  test('error()', () => {
    const state = getMockState({
      error: '',
      files: [],
      isFolderInvalid: true,
      state: 'invalid',
    });
    const expectedState = getMockState({
      error: 'FETCH',
      files: false,
      isFolderInvalid: false,
      state: 'error',
    });

    expect(state).not.to.eql(expectedState);
    error(state, { payload: 'FETCH', type: 'ws/error' });
    expect(state).to.eql(expectedState);
  });

  test('fetch() - Fulfilled - Valid folder', () => {
    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: visibleFiles,
      files,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles,
    });

    //expect(state).not.to.eql(expectedState);
    fetchFulfilled(state, {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: files,
      type: 'ws/list',
    });
    //expect(state).to.eql(expectedState);x
    expectedState;
  });

  test('fetch() - Fulfilled - Invalid folder', () => {
    const state = getMockState({
      convertedFiles: visibleFiles,
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles,
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

  test('fetch() - Pending', () => {
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

  test('fetch() - Rejected', () => {
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

  test('invalid()', () => {
    const state = getMockState({
      files: [],
      isFolderInvalid: false,
      state: 'error',
    });
    const expectedState = getMockState({
      files: false,
      isFolderInvalid: true,
      state: 'invalid',
    });

    expect(state).not.to.eql(expectedState);
    invalid(state);
    expect(state).to.eql(expectedState);
  });

  test('list() - Invalid folder', () => {
    const state = getMockState({
      convertedFiles: visibleFiles,
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles,
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

  test('list() - Valid folder', () => {
    const state = getMockState({
      convertedFiles: [],
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: visibleFiles,
      files,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: files,
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('loading()', () => {
    const state = getMockState({
      error: 'FETCH',
      files: [],
      isFolderInvalid: true,
      selected: 'sdasd',
      state: 'error',
    });
    const expectedState = getMockState({
      error: '',
      files: false,
      isFolderInvalid: false,
      selected: '',
      state: 'loading',
    });

    expect(state).not.to.eql(expectedState);
    loading(state);
    expect(state).to.eql(expectedState);
  });

  test('setPersistedState()', () => {
    const state = getMockState({
      sort: 'descending',
    });
    const expectedState = getMockState({
      sort: 'ascending',
    });

    expect(state).not.to.eql(expectedState);
    setPersistedState(state, { payload: { sort: 'ascending' }, type: 'ws/setPersistedState' });
    expect(state).to.eql(expectedState);
  });

  test('setSearchTerm() - Invalid folder', () => {
    const state = getMockState({
      files: false,
      search: '',
      visibleFiles,
    });
    const expectedState = getMockState({
      search: TERM,
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('setSearchTerm() - Valid folder', () => {
    const state = getMockState({
      convertedFiles: visibleFiles,
      files,
      search: '',
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: visibleFiles,
      files,
      search: TERM,
      visibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('setShowPaths()', () => {
    const state = getMockState({
      convertedFiles: visibleFiles,
      files,
      visibleFiles: [],
    });
    const expectedState = getMockState({
      convertedFiles: visibleFiles,
      files,
      visibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    setShowPaths(state);
    expect(state).to.eql(expectedState);
  });
});
