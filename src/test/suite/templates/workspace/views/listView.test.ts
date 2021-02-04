/* import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { listView } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/list';

suite('Templates > Workspace > View: listView()', () => {
  const imgDarkFolderUri = {
    scheme: 'file',
    authority: 'localhost',
    path: '/resources/imgages/dark',
  } as vscode.Uri;
  const imgLightFolderUri = {
    scheme: 'file',
    authority: 'localhost',
    path: '/resources/imgages/light',
  } as vscode.Uri;

  test('Renders correctly if there are no files', () => {
    const result = listView(false, '', imgDarkFolderUri, imgLightFolderUri);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are files', () => {
    const spy = sinon.spy(snippets, 'list');
    const result = listView([], '', imgDarkFolderUri, imgLightFolderUri);

    expect(result).to.be.a('string');
    expect(result.includes('class="view')).to.equal(true);
    expect(result).not.to.equal('');
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, [], '', imgDarkFolderUri, imgLightFolderUri);
  });
});
 */
