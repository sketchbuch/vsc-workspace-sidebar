import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { setVisibleFiles } from '../../../../../webviews/Workspace/store/setVisibleFiles';
import {
  getMockFileTree,
  getMockVisibleFiles,
  getMockConvertedFiles,
  getMockFileList,
  ROOT_FOLDER_PATH,
  getMockFolderList,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setVisibleFiles()', () => {
  let condenseConfigStub: sinon.SinonStub;
  let folderConfigStub: sinon.SinonStub;
  let treeConfigStub: sinon.SinonStub;

  setup(() => {
    condenseConfigStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => true);
    folderConfigStub = sinon.stub(configs, 'getFolderConfig').callsFake(() => ROOT_FOLDER_PATH);
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    condenseConfigStub.restore();
    folderConfigStub.restore();
    treeConfigStub.restore();
  });

  test('No files updates state as expected', () => {
    const state = getMockState();
    const expectedState = getMockState();

    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('With files - tree - updates state as expected', () => {
    condenseConfigStub.callsFake(() => false);
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('normal'),
      treeFolders: getMockFolderList('normal'),
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('With files - tree condensed - updates state as expected', () => {
    treeConfigStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: getMockFileTree('condensed'),
      treeFolders: getMockFolderList('condensed'),
      visibleFiles: getMockVisibleFiles(),
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('With files - list asc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'ascending',
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      sort: 'ascending',
      visibleFiles: getMockVisibleFiles('asc'),
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('With files - list desc - updates state as expected', () => {
    const state = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      sort: 'descending',
    });
    const expectedState = getMockState({
      convertedFiles: getMockConvertedFiles(),
      files: getMockFileList(),
      fileTree: null,
      sort: 'descending',
      visibleFiles: getMockVisibleFiles('desc'),
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });
});
