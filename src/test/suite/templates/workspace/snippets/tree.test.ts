import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import * as sort from '../../../../../templates/helpers/sortTreeChildren';
import * as trees from '../../../../../templates/workspace/snippets/tree';
import { tree } from '../../../../../templates/workspace/snippets/tree';
import * as item from '../../../../../templates/workspace/snippets/treeItemFile';
import * as folder from '../../../../../templates/workspace/snippets/treeItemFolder';
import { FileTree } from '../../../../../webviews/Workspace/helpers/getFileTree';
import {
  file1,
  file2,
  file3,
  file4,
  FOLDER1,
  FOLDER3,
  FOLDER4,
  getMockFileList,
  getMockFileTree,
  ROOT_FOLDER,
  SUBFOLDER1,
  SUBFOLDER2,
  SUBFOLDER3,
  SUBFOLDER4,
} from '../../../../mocks/mockFileData';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > Snippets: tree()', () => {
  const state = getMockState();
  let folderSpy: sinon.SinonSpy;
  let itemSpy: sinon.SinonSpy;
  let showRootConfigStub: sinon.SinonStub;
  let sortSpy: sinon.SinonSpy;
  let treeSpy: sinon.SinonSpy;

  const closedFolderTree: FileTree = {
    files: [],
    folderPath: FOLDER1,
    isRoot: false,
    label: FOLDER1,
    searchLabel: FOLDER1.toLowerCase(),
    sub: [],
  };

  const emptyRootTree: FileTree = {
    files: [],
    folderPath: ROOT_FOLDER,
    isRoot: true,
    label: ROOT_FOLDER,
    searchLabel: ROOT_FOLDER.toLowerCase(),
    sub: [],
  };

  setup(() => {
    folderSpy = sinon.spy(folder, 'treeItemFolder');
    itemSpy = sinon.spy(item, 'treeItemFile');
    showRootConfigStub = sinon.stub(configs, 'getShowRootFolderConfig').callsFake(() => false);
    sortSpy = sinon.spy(sort, 'sortTreeChildren');
    treeSpy = sinon.spy(trees, 'tree');
  });

  teardown(() => {
    folderSpy.restore();
    itemSpy.restore();
    showRootConfigStub.restore();
    sortSpy.restore();
    treeSpy.restore();
  });

  test('An empty tree will render just the root folder', () => {
    showRootConfigStub.callsFake(() => true);

    const result = tree(emptyRootTree, 0, mockRenderVars, state);

    expect(result).to.be.a('string');

    sinon.assert.calledOnce(folderSpy);
    sinon.assert.notCalled(itemSpy);
    sinon.assert.calledOnce(sortSpy);
    sinon.assert.calledOnce(treeSpy);
  });

  test('Children are not sorted if a folder is closed', () => {
    tree(closedFolderTree, 0, mockRenderVars, { ...state, closedFolders: [FOLDER1] });
    sinon.assert.notCalled(sortSpy);
  });

  test('Root folder is rendered if there are root level files', () => {
    showRootConfigStub.callsFake(() => true);

    const rootChildrenFileTree: FileTree = { ...getMockFileTree('normal'), files: [{ ...file1 }] };
    tree(rootChildrenFileTree, 0, mockRenderVars, state);

    expect(folderSpy.args[0][0].folderPath).to.equal(ROOT_FOLDER);
  });

  test('Root folder is not rendered if there are no root level files', () => {
    tree(getMockFileTree('normal'), 0, mockRenderVars, state);

    expect(folderSpy.args[0][0].folderPath).not.to.equal(ROOT_FOLDER);
    expect(folderSpy.args[0][1]).to.equal(0); // Depth should have been zero for at least one non-root folder
    expect(folderSpy.args[0][0].folderPath).to.equal(FOLDER1);
  });

  test('All files/folders are rendered', () => {
    tree(getMockFileTree('normal'), 0, mockRenderVars, state);

    sinon.assert.callCount(itemSpy, getMockFileList().length);
    // Order like this due to child sorting
    expect(itemSpy.args[0][0].label).to.equal(file2.label);
    expect(itemSpy.args[1][0].label).to.equal(file1.label);
    expect(itemSpy.args[2][0].label).to.equal(file3.label);
    expect(itemSpy.args[3][0].label).to.equal(file4.label);

    sinon.assert.callCount(folderSpy, 7);
    expect(folderSpy.args[0][0].label).to.equal(FOLDER1);
    expect(folderSpy.args[1][0].label).to.equal(SUBFOLDER1);
    expect(folderSpy.args[2][0].label).to.equal(SUBFOLDER2);
    expect(folderSpy.args[3][0].label).to.equal(FOLDER3);
    expect(folderSpy.args[4][0].label).to.equal(SUBFOLDER3);
    expect(folderSpy.args[5][0].label).to.equal(FOLDER4);
    expect(folderSpy.args[6][0].label).to.equal(SUBFOLDER4);
  });
});
