import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { ConfigShowPaths } from '../../../../constants';
import { getVisibleFiles } from '../../../../webviews/Workspace/helpers/getVisibleFiles';
import { getMockFiles } from '../../../mocks';

suite('Webviews > Workspace > getVisibleFiles():', () => {
  const options = { hasPath: true };

  test('Search correctly filters', () => {
    const files = getMockFiles(2);
    const result = getVisibleFiles(files, '2', 'ascending');

    expect(result).to.eql([files[1]]);
  });

  suite('Sorting:', () => {
    test('Corectly sorts "ascending"', () => {
      const files = getMockFiles(2).reverse();
      const expectedFiles = getMockFiles(2);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(expectedFiles);
    });

    test('Corectly sorts "descending"', () => {
      const files = getMockFiles(2);
      const expectedFiles = getMockFiles(2).reverse();
      const result = getVisibleFiles(files, '', 'descending');

      expect(result).to.eql(expectedFiles);
    });
  });

  suite('Show paths:', () => {
    test('"Never" returns file array without paths', () => {
      const stub = sinon.stub(vscode.workspace, 'getConfiguration');
      stub.returns({
        get: (config: string): string | number => ConfigShowPaths.NEVER,
      } as vscode.WorkspaceConfiguration);

      const files = getMockFiles(2, options);
      const expectedFiles = getMockFiles(2);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(expectedFiles);
      stub.restore();
    });

    test('"Always" returns file array with paths', () => {
      const stub = sinon.stub(vscode.workspace, 'getConfiguration');
      stub.returns({
        get: (config: string): string | number => ConfigShowPaths.ALWAYS,
      } as vscode.WorkspaceConfiguration);

      const files = getMockFiles(2, options);
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql(files);
      stub.restore();
    });

    test('"As needed" returns file array with paths', () => {
      const stub = sinon.stub(vscode.workspace, 'getConfiguration');
      stub.returns({
        get: (config: string): string | number => ConfigShowPaths.AS_NEEEDED,
      } as vscode.WorkspaceConfiguration);

      const files = getMockFiles(3, options);
      files[2].label = files[0].label;
      const expectedFiles = getMockFiles(3, options);
      expectedFiles[2].label = expectedFiles[0].label;
      expectedFiles[1].path = '';
      const result = getVisibleFiles(files, '', 'ascending');

      expect(result).to.eql([expectedFiles[0], expectedFiles[2], expectedFiles[1]]);
      stub.restore();
    });
  });
});
