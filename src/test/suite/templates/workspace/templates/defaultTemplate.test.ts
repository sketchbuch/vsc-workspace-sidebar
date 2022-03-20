import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import * as dynamic from '../../../../../templates/common/snippets/dynamicCss';
import { defaultTemplate } from '../../../../../templates/workspace';
import * as content from '../../../../../templates/workspace/views/loadingView';
import { getMockState, getMockTemplateVars } from '../../../../mocks';

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

    suite('Dynamic CSS', () => {
      const DEPTH = 5;
      let depthStub: sinon.SinonStub;
      let dynamicSpy: sinon.SinonSpy;
      let treeStub: sinon.SinonStub;

      setup(() => {
        depthStub = sinon.stub(configs, 'getDepthConfig').callsFake(() => DEPTH);
        dynamicSpy = sinon.spy(dynamic, 'dynamicCss');
        treeStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
      });

      teardown(() => {
        depthStub.restore();
        dynamicSpy.restore();
        treeStub.restore();
      });

      test('Not rendered if not tree view', () => {
        const result = defaultTemplate(templateVars, state);
        expect(result).not.contains(
          `<style nonce="${templateVars.nonce}" id="ws-webview-css-dynamic">`
        );
        sinon.assert.callCount(dynamicSpy, 0);
      });

      test('Rendered if tree view', () => {
        treeStub.callsFake(() => true);
        const result = defaultTemplate(templateVars, state);
        expect(result).contains(
          `<style nonce="${templateVars.nonce}" id="ws-webview-css-dynamic">`
        );
        sinon.assert.callCount(dynamicSpy, 1);
        sinon.assert.calledWith(dynamicSpy, DEPTH);
      });
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
