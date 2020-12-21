import { expect } from 'chai';
import { Uri } from 'vscode';
import { defaultTemplate } from '../../../../../templates/workspace';
import { WorkspaceState } from '../../../../../webviews';
import { GetTemplate } from '../../../../../webviews/webviews.interface';

suite('Workspace: defaultTemplate()', () => {
  const state: WorkspaceState = {
    error: '',
    files: false,
    isFolderInvalid: false,
    state: 'loading',
  };
  const props: GetTemplate = {
    cspSource: 'test-cspSource',
    cssFolderUri: {
      scheme: 'file',
      authority: 'localhost',
      path: '/resources/css',
    } as Uri,
    nonce: '3w342erf32',
    scriptFolderUri: {
      scheme: 'file',
      authority: 'localhost',
      path: '/resources/js',
    } as Uri,
  };

  test('Renders correctly', () => {
    const result = defaultTemplate(props, state);
    expect(result).to.be.a('string');
    expect(result).contains('<!DOCTYPE html>');
    expect(result).contains('<html');
    expect(result).contains('</html>');
    expect(result).contains('<head');
    expect(result).contains('</head>');
    expect(result).contains('<body');
    expect(result).contains('</body>');
  });

  suite('<head>', () => {
    test('Contains a <title> tag', () => {
      const result = defaultTemplate(props, state);
      expect(result).contains('<title');
      expect(result).contains('</title>');
    });

    test('Contains the correct Content-Security-Policy meta tag', () => {
      const result = defaultTemplate(props, state);
      expect(result).contains('<meta http-equiv="Content-Security-Policy"');
      expect(result).contains(
        `content="default-src ${props.cspSource} vscode-resource: 'nonce-${props.nonce}`
      );
      expect(result).contains(
        `img-src ${props.cspSource} vscode-resource: data: 'nonce-${props.nonce}`
      );
      expect(result).contains(
        `script-src ${props.cspSource} vscode-resource: 'nonce-${props.nonce}`
      );
      expect(result).contains(
        `style-src ${props.cspSource} vscode-resource: 'nonce-${props.nonce}`
      );
    });

    test('Contains other expected meta tags', () => {
      const result = defaultTemplate(props, state);
      expect(result).contains('<meta charset="UTF-8">');
      expect(result).contains(
        'meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
    });
  });

  suite('<body>', () => {
    test('Contains a <script> tag', () => {
      const result = defaultTemplate(props, state);
      expect(result).contains(`<script nonce="${props.nonce}" `);
      expect(result).contains('</script>');
    });
  });

  /* test('Contains a <html> tag', () => {
    expect(result).contains('<html');
    expect(result).contains('</html>');
  });

  test('Contains a <head> tag', () => {
    expect(result).contains('<head');
    expect(result).contains('</head>');
  });

  test('Contains a <body> tag', () => {
    expect(result).contains('<body');
    expect(result).contains('</body>');
  });

  suite('<head>', () => {
    test('Contains a <title> tag', () => {
      expect(result).contains('<title');
      expect(result).contains('</title>');
    });

    test('Contains the correct Content-Security-Policy meta tag', () => {
      expect(result).contains('<meta http-equiv="Content-Security-Policy"');
      expect(result).contains(`content="default-src 'self' vscode-resource: 'nonce-${props.nonce}`);
      expect(result).contains(`img-src 'self' vscode-resource: data: 'nonce-${props.nonce}`);
      expect(result).contains(`script-src 'self' vscode-resource: 'nonce-${props.nonce}`);
      expect(result).contains(`style-src 'self' vscode-resource: 'nonce-${props.nonce}`);
    });

    test('Contains other expected meta tags', () => {
      expect(result).contains('<meta charset="UTF-8">');
      expect(result).contains(
        'meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
    });
  });

  suite('<body>', () => {
    test('Contains a <script> tag', () => {
      expect(result).contains(`<script nonce="${props.nonce}" `);
      expect(result).contains('</script>');
    });
  }); */
});
