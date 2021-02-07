import { expect } from 'chai';
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
import { getMockState } from '../../../mocks';

suite('Webviews > Workspace > reducers:', () => {
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
      files: false,
      isFolderInvalid: false,
      state: 'loading',
    });
    const expectedState = getMockState({
      files: ['/a/file', '/another/file'],
      isFolderInvalid: false,
      state: 'list',
    });

    expect(state).not.to.eql(expectedState);
    fetchFulfilled(state, {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: ['/a/file', '/another/file'],
      type: 'ws/list',
    });
    expect(state).to.eql(expectedState);
  });

  test('fetch() - Fulfilled - Invalid folder', () => {
    const state = getMockState({
      files: false,
      isFolderInvalid: false,
      state: 'loading',
    });
    const expectedState = getMockState({
      files: false,
      isFolderInvalid: true,
      state: 'invalid',
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
      files: false,
      isFolderInvalid: false,
      state: 'loading',
    });
    const expectedState = getMockState({
      files: false,
      isFolderInvalid: true,
      state: 'invalid',
    });

    expect(state).not.to.eql(expectedState);
    list(state, { payload: false, type: 'ws/list' });
    expect(state).to.eql(expectedState);
  });

  test('list() - Valid folder', () => {
    const state = getMockState({
      files: false,
      isFolderInvalid: false,
      state: 'loading',
    });
    const expectedState = getMockState({
      files: ['/a/file', '/another/file'],
      isFolderInvalid: false,
      state: 'list',
    });

    expect(state).not.to.eql(expectedState);
    list(state, { payload: ['/a/file', '/another/file'], type: 'ws/list' });
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
});
