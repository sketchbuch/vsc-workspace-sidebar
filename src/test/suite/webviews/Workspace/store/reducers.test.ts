import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { ConfigShowPaths } from '../../../../../constants/config';
import { error } from '../../../../../webviews/Workspace/store/error';
import {
  fetchFulfilled,
  fetchPending,
  fetchRejected,
} from '../../../../../webviews/Workspace/store/fetch';
import { invalid } from '../../../../../webviews/Workspace/store/invalid';
import { list } from '../../../../../webviews/Workspace/store/list';
import { loading } from '../../../../../webviews/Workspace/store/loading';
import { setPersistedState } from '../../../../../webviews/Workspace/store/setPersistedState';
import { setSearchTerm } from '../../../../../webviews/Workspace/store/setSearchTerm';
import { setVisibleFiles } from '../../../../../webviews/Workspace/store/setVisibleFiles';
import { toggleFolderState } from '../../../../../webviews/Workspace/store/toggleFolderState';
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk';
import {
  file4,
  mockFileList,
  mockFilesForFileTree,
  mockFilesForFileTreeNoPaths,
  mockFileTree,
  mockFileTreeFolders,
  ROOT_TREE,
} from '../../../../mocks/mockFileTree';
import { getMockState } from '../../../../mocks/mockState';

suite.only('Webviews > Workspace > Store > reducers:', () => {
  const TERM = 'react';

  let cleanStub: sinon.SinonStub;
  let pathsStub: sinon.SinonStub;
  let treeStub: sinon.SinonStub;

  setup(() => {
    cleanStub = sinon.stub(configs, 'getCleanLabelsConfig').callsFake(() => true);
    pathsStub = sinon.stub(configs, 'getShowPathsConfig').callsFake(() => ConfigShowPaths.NEVER);
    treeStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_TREE);
  });

  teardown(() => {
    cleanStub.restore();
    pathsStub.restore();
    treeStub.restore();
  });

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
      convertedFiles: mockFilesForFileTree,
      files: mockFileList,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: mockFilesForFileTreeNoPaths,
    });

    //expect(state).not.to.eql(expectedState);
    fetchFulfilled(state, {
      meta: { arg: undefined, requestId: '', requestStatus: 'fulfilled' },
      payload: mockFileList,
      type: 'ws/list',
    });
    //expect(state).to.eql(expectedState);x
    expectedState;
  });

  test('fetch() - Fulfilled - Invalid folder', () => {
    const state = getMockState({
      convertedFiles: mockFilesForFileTree,
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: mockFilesForFileTreeNoPaths,
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
      convertedFiles: mockFilesForFileTree,
      files: false,
      isFolderInvalid: false,
      state: 'loading',
      visibleFiles: mockFilesForFileTreeNoPaths,
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
      convertedFiles: mockFilesForFileTreeNoPaths,
      files: mockFileList,
      fileTree: mockFileTree,
      isFolderInvalid: false,
      state: 'list',
      visibleFiles: mockFilesForFileTreeNoPaths,
    });

    expect(state).not.to.eql(expectedState);
    list(state, {
      payload: mockFileList,
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
      visibleFiles: [],
    });
    const expectedState = getMockState({
      search: TERM,
      visibleFiles: [],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test.skip('setSearchTerm() - Valid folder', () => {
    const state = getMockState({
      convertedFiles: mockFilesForFileTree,
      files: mockFileList,
      search: '',
      visibleFiles: [],
    });
    const expectedFileTree = { ...mockFileTree };
    const file4Tree = expectedFileTree.sub.pop()!;
    expectedFileTree.sub = [{ ...file4Tree }];
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      fileTree: expectedFileTree,
      files: mockFileList,
      search: TERM,
      visibleFiles: [{ ...file4, showPath: false }],
    });

    expect(state).not.to.eql(expectedState);
    setSearchTerm(state, { payload: TERM, type: 'ws/setSearchTerm' });
    expect(state).to.eql(expectedState);
  });

  test('setVisibleFiles()', () => {
    const state = getMockState({
      convertedFiles: mockFilesForFileTree,
      files: mockFileList,
    });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTreeNoPaths,
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('setVisibleFiles() - No files', () => {
    const state = getMockState();
    const expectedState = getMockState();

    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderState() - Adds open folder to closed list', () => {
    const FOLDER = 'vsc';
    const state = getMockState();
    const expectedState = getMockState({
      closedFolders: [FOLDER],
    });

    expect(state).not.to.eql(expectedState);
    toggleFolderState(state, { payload: FOLDER, type: 'ws/toggleFolderState' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderState() - Removes closed folder from closed list', () => {
    const FOLDER = 'vsc';
    const state = getMockState({
      closedFolders: [FOLDER],
    });
    const expectedState = getMockState({
      closedFolders: [],
    });

    expect(state).not.to.eql(expectedState);
    toggleFolderState(state, { payload: FOLDER, type: 'ws/toggleFolderState' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderState() - Leaves state as-is if folder is an empty string', () => {
    const FOLDER = '';
    const state = getMockState();
    const expectedState = getMockState();

    expect(state).to.eql(expectedState);
    toggleFolderState(state, { payload: FOLDER, type: 'ws/toggleFolderState' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderStateBulk() - "expand" clears closedFolders, if there were any', () => {
    const state = getMockState({
      closedFolders: ['vsc', 'react', 'react/test'],
    });
    const expectedState = getMockState();

    expect(state).not.to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderStateBulk() - "expand" does nothing if there are no closedFolders', () => {
    const state = getMockState();
    const expectedState = getMockState();

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderStateBulk() - "collapse" does nothing if there are no visibleFiles', () => {
    const state = getMockState();
    const expectedState = getMockState();

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderStateBulk() - "collapse" does nothing if all folders are closed', () => {
    const state = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: mockFileTreeFolders,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTreeNoPaths,
    });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: mockFileTreeFolders,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTreeNoPaths,
    });

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('toggleFolderStateBulk() - "collapse" will close all folders if some are still open', () => {
    const state = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: [...mockFileTreeFolders.slice(0, 1)],
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTreeNoPaths,
    });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: mockFileTreeFolders,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTreeNoPaths,
    });

    expect(state).not.to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });
});
