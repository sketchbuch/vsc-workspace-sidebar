import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { setVisibleFiles } from '../../../../../webviews/Workspace/store/setVisibleFiles';
import {
  mockCondensedFileTree,
  mockConvertedFiles,
  mockFileList,
  mockFileTree,
  mockVisibleFiles,
} from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setVisibleFiles()', () => {
  let condenseStub: sinon.SinonStub;

  setup(() => {
    condenseStub = sinon.stub(configs, 'getCondenseFileTreeConfig').callsFake(() => false);
  });

  teardown(() => {
    condenseStub.restore();
  });

  test('With files updates state as expected', () => {
    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      fileTree: mockFileTree,
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('With files (condensed) updates state as expected', () => {
    condenseStub.callsFake(() => true);

    const state = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
    });
    const expectedState = getMockState({
      convertedFiles: mockConvertedFiles,
      files: mockFileList,
      fileTree: mockCondensedFileTree,
      visibleFiles: mockVisibleFiles,
    });

    expect(state).not.to.eql(expectedState);
    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });

  test('No files updates state as expected', () => {
    const state = getMockState();
    const expectedState = getMockState();

    setVisibleFiles(state);
    expect(state).to.eql(expectedState);
  });
});
