import * as sinon from 'sinon';
import * as trans from 'vscode-ext-localisation';
import * as commands from '../../../commands';
import { setupExt } from '../../../core';
import * as webviews from '../../../webviews';
import { mockContext } from '../../mocks';

suite.skip('Core > activate()', function () {
  test('setupExt() sets up extension correctly', function () {
    // TODO - Fix test
    const commandsStub = sinon.stub(commands, 'registerCommands');
    const webviewsStub = sinon.stub(webviews, 'registerWebviews');
    const transGetLangStub = sinon.stub(trans, 'getVscodeLang');
    const transLoadStub = sinon.stub(trans, 'loadTranslations');

    setupExt(mockContext, 'en');

    sinon.assert.calledOnce(commandsStub);
    sinon.assert.calledOnce(webviewsStub);
    sinon.assert.calledOnce(transGetLangStub);
    sinon.assert.calledOnce(transGetLangStub);

    sinon.assert.calledWith(commandsStub, mockContext);
    sinon.assert.calledWith(webviewsStub, mockContext);

    commandsStub.restore();
    webviewsStub.restore();
    transGetLangStub.restore();
    transLoadStub.restore();
  });
});
