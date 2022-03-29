import { expect } from 'chai';
import { toggleFolderStateBulk } from '../../../../../webviews/Workspace/store/toggleFolderStateBulk';
import {
  mockConvertedFiles,
  mockFileList,
  mockFileTree,
  mockFolderList,
  mockVisibleFiles,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > toggleFolderStateBulk()', () => {
  test('"expand" clears closedFolders, if there were any', () => {
    const state = getMockState({
      closedFolders: ['vsc', 'react', 'react/test'],
    });
    const expectedState = getMockState();

    expect(state).not.to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('"expand" does nothing if there are no closedFolders', () => {
    const state = getMockState();
    const expectedState = getMockState();

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'expand', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('"collapse" does nothing if there are no visibleFiles', () => {
    const state = getMockState();
    const expectedState = getMockState();

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('"collapse" does nothing if all folders are closed', () => {
    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      closedFolders: mockFolderList,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      closedFolders: mockFolderList,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockVisibleFiles,
    });

    expect(state).to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });

  test('"collapse" will close all folders if some are still open', () => {
    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      closedFolders: [...mockFolderList.slice(0, 1)],
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      closedFolders: mockFolderList,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    toggleFolderStateBulk(state, { payload: 'collapse', type: 'ws/toggleFolderStateBulk' });
    expect(state).to.eql(expectedState);
  });
});
