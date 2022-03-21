import { expect } from 'chai';
import * as sinon from 'sinon';
import { defaultTemplate } from '../../../../../templates/workspace/templates/defaultTemplate';
import * as content from '../../../../../templates/workspace/views/loadingView';
import { getMockState } from '../../../../mocks/mockState';
import { getMockTemplateVars } from '../../../../mocks/mockTemplateVars';

suite('Templates > Workspace > Templates: defaultTemplate()', () => {
  const state = getMockState();
  const templateVars = getMockTemplateVars();

  test('Renders correctly', () => {
    const result = defaultTemplate(templateVars, state);
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
      const result = defaultTemplate(templateVars, state);
      expect(result).contains(`<title>Workspaces</title>`);
    });

    test('Renders the <title> tag correctly if list view', () => {
      const TITLE = '2/10';
      const result = defaultTemplate(
        getMockTemplateVars({ title: TITLE }),
        getMockState({ state: 'list' })
      );
      expect(result).contains(`<title>Workspaces: ${TITLE}</title>`);
    });

    test('Contains the correct Content-Security-Policy meta tag', () => {
      const result = defaultTemplate(templateVars, state);
      expect(result).contains('<meta http-equiv="Content-Security-Policy"');
      expect(result).contains(
        `content="default-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      );
      expect(result).contains(
        `img-src ${templateVars.cspSource} vscode-resource: data: 'nonce-${templateVars.nonce}`
      );
      expect(result).contains(
        `script-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      );
      expect(result).contains(
        `style-src ${templateVars.cspSource} vscode-resource: 'nonce-${templateVars.nonce}`
      );
    });

    test('Contains other expected meta tags', () => {
      const result = defaultTemplate(templateVars, state);
      expect(result).contains('<meta charset="UTF-8">');
      expect(result).contains(
        'meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
    });
  });

  suite('<body>', () => {
    test('Contains <script> tags', () => {
      const result = defaultTemplate(templateVars, state);
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="ws-webview-js"`);
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="codicons-js"`);
    });

    test('Renders content', () => {
      let contentStub = sinon.stub(content, 'loadingView').callsFake(() => 'THE_CONTENT');

      const result = defaultTemplate(templateVars, state);
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="ws-webview-js"`);
      expect(result).contains(`<script nonce="${templateVars.nonce}" id="codicons-js"`);
      expect(result).contains(`THE_CONTENT`);

      contentStub.restore();
    });
  });
});
