import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../config/getConfig';
import { ConfigShowPaths, FS_WS_FILETYPE } from '../../../../constants';
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
import { setVisibleFiles } from '../../../../webviews/Workspace/store/setVisibleFiles';
import { toggleFolderState } from '../../../../webviews/Workspace/store/toggleFolderState';
import { toggleFolderStateBulk } from '../../../../webviews/Workspace/store/toggleFolderStateBulk';
import { getMockFiles, getMockState } from '../../../mocks';
import {
  mockFileList,
  mockFilesForFileTree,
  mockFileTree,
  mockFileTreeFolders,
} from '../../../mocks/mockFileTree';

suite('Webviews > Workspace > reducers:', () => {
  const visibleFiles = getMockFiles(2, { fileType: FS_WS_FILETYPE });
  const files = [visibleFiles[0].file, visibleFiles[1].file];
  const TERM = 'file';
  let pathsStub: sinon.SinonStub;

  setup(() => {
    pathsStub = sinon.stub(configs, 'getShowPathsConfig').callsFake(() => ConfigShowPaths.ALWAYS);
  });

  teardown(() => {
    pathsStub.restore();
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

  test('setVisibleFiles()', () => {
    const state = getMockState({ convertedFiles: mockFilesForFileTree, files: mockFileList });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTree,
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
      visibleFiles: mockFilesForFileTree,
    });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: mockFileTreeFolders,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTree,
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
      visibleFiles: mockFilesForFileTree,
    });
    const expectedState = getMockState({
      convertedFiles: mockFilesForFileTree,
      closedFolders: mockFileTreeFolders,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockFilesForFileTree,
    });

    expect(state).not.to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });
});
