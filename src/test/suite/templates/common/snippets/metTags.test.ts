import { expect } from 'chai';
import { metaTags } from '../../../../../templates/common';

suite('Templates > Common > Snippets: metaTags()', () => {
  test('Contains the correct Content-Security-Policy meta tag', () => {
    const cspSource = 'test-cspSource';
    const nonce = 'test-nonce';
    const result = metaTags(nonce, cspSource);

    expect(result).contains('<meta http-equiv="Content-Security-Policy"');
    expect(result).contains(`content="default-src ${cspSource} vscode-resource: 'nonce-${nonce}`);
    expect(result).contains(`img-src ${cspSource} vscode-resource: data: 'nonce-${nonce}`);
    expect(result).contains(`script-src ${cspSource} vscode-resource: 'nonce-${nonce}`);
    expect(result).contains(`style-src ${cspSource} vscode-resource: 'nonce-${nonce}`);
  });
});
