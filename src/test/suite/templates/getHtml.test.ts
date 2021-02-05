import { expect } from 'chai';
import mockFs from 'mock-fs';
import * as sinon from 'sinon';
import { NONCE_CHARS } from '../../../constants';
import { getHtml } from '../../../templates/getHtml';
import { getNonce } from '../../../utils';
import { WorkspaceState } from '../../../webviews';
import { GetHtml, GetHtmlTemplateFunc } from '../../../webviews/webviews.interface';
import {
  getMockState,
  getMockTemplateVars,
  mockExtensionUri,
  mockFsStructure,
  mockWebView,
} from '../../mocks';

suite('Templates > getHtml()', () => {
  const mockState = getMockState();
  const mockTemplateReturn = 'this is the content';
  const nonce = getNonce(NONCE_CHARS, Math.random());

  const getGetHtml = (template: GetHtmlTemplateFunc<WorkspaceState>): GetHtml<WorkspaceState> => {
    return {
      extensionPath: mockExtensionUri,
      template,
      htmlData: {
        data: mockState,
        webview: mockWebView,
      },
    };
  };

  suiteSetup(() => {
    mockFs(mockFsStructure);
  });

  suiteTeardown(() => {
    mockFs.restore();
  });

  test('Returns expected string', () => {
    const stub = sinon.stub();
    stub.returns(mockTemplateReturn);
    const result = getHtml<WorkspaceState>(getGetHtml(stub), nonce);

    expect(result).to.be.a('string');
    expect(result).to.equal(mockTemplateReturn);

    sinon.assert.callCount(stub, 1);
    expect(stub.getCalls()[0].args[0]).to.eql(getMockTemplateVars({ nonce }, true));
    expect(stub.getCalls()[0].args[1]).to.equal(mockState);
    stub.reset();
  });
});
