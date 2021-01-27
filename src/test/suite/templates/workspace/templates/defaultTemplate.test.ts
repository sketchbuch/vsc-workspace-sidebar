import { expect } from 'chai';
import { Uri } from 'vscode';
import { defaultTemplate } from '../../../../../templates/workspace';
import { GetTemplate } from '../../../../../webviews/webviews.interface';
import { WorkspaceContext } from '../../../../../webviews/Workspace/state.interface';

suite('Templates > Workspace > Templates: defaultTemplate()', () => {
  const state: WorkspaceContext = {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: '',
    state: 'loading',
  };
  const props: GetTemplate = {
    cspSource: 'test-cspSource',
    cssFolderUri: {
      scheme: 'file',
      authority: 'localhost',
      path: '/resources/css',
    } as Uri,
    nonce: 'test-nonce',
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
});
