import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { list } from '../../../../../templates/workspace';
import * as snippets from '../../../../../templates/workspace/snippets/listItem';

suite('Templates > Workspace > Snippets: list()', () => {
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
    const result = list([], '', imgDarkFolderUri, imgLightFolderUri);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders correctly if there are files', () => {
    const spy = sinon.spy(snippets, 'listItem');
    const result = list(['one', 'two'], '', imgDarkFolderUri, imgLightFolderUri);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    sinon.assert.calledTwice(spy);
    expect(spy.getCalls()[0].args[0]).to.eql({
      file: 'one',
      label: 'One',
      path: '',
      selected: false,
    });
    expect(spy.getCalls()[1].args[0]).to.eql({
      file: 'two',
      label: 'Two',
      path: '',
      selected: false,
    });

    spy.restore();
  });
});
