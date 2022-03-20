import { expect } from 'chai';
import * as sinon from 'sinon';
import * as tree from '../../../../../templates/workspace/snippets/tree';
import * as file from '../../../../../templates/workspace/snippets/treeItemFile';
import * as folder from '../../../../../templates/workspace/snippets/treeItemFolder';
import * as sort from '../../../../../utils/arrays/sortFilesByProp';
import { mockFileTree } from '../../../../mocks/mockFileTree';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > Snippets: tree()', () => {
  const DEPTH = 0;
  const mockState = getMockState();

  const deepTree = { ...mockFileTree };
  delete deepTree.flutter;
  delete deepTree.react;

  let fileSpy: sinon.SinonSpy;
  let folderSpy: sinon.SinonSpy;
  let sortSpy: sinon.SinonSpy;
  let treeSpy: sinon.SinonSpy;

  setup(() => {
    fileSpy = sinon.spy(file, 'treeItemFile');
    folderSpy = sinon.spy(folder, 'treeItemFolder');
    sortSpy = sinon.spy(sort, 'sortFilesByProp');
    treeSpy = sinon.spy(tree, 'tree');
  });

  teardown(() => {
    fileSpy.restore();
    folderSpy.restore();
    sortSpy.restore();
    treeSpy.restore();
  });

  test('Flat tree renders as expected', () => {
    const flatTree = { ...mockFileTree };
    delete flatTree.code;

    const result = tree.tree(flatTree, mockRenderVars, mockState, DEPTH);

    expect(result).to.be.a('string');
    sinon.assert.callCount(fileSpy, 2);
    sinon.assert.callCount(folderSpy, 2);
    sinon.assert.callCount(sortSpy, 2);
    sinon.assert.callCount(treeSpy, 1);
  });

  test('Deep tree renders as expected', () => {
    const result = tree.tree(deepTree, mockRenderVars, { ...mockState, closedFolders: [] }, DEPTH);

    expect(result).to.be.a('string');
    sinon.assert.callCount(fileSpy, 2);
    sinon.assert.callCount(folderSpy, 2);
    sinon.assert.callCount(sortSpy, 2);
    sinon.assert.callCount(treeSpy, 2);
  });

  test('tree not called for subs if the folder is closed', () => {
    const result = tree.tree(
      deepTree,
      mockRenderVars,
      { ...mockState, closedFolders: [deepTree.code.folderPath] },
      DEPTH
    );

    expect(result).to.be.a('string');
    sinon.assert.callCount(treeSpy, 1);
  });
});
