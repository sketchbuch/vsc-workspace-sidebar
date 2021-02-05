import { expect } from 'chai';
import { t } from 'vscode-ext-localisation';
import { settingsLink } from '../../../../../templates/common/snippets/settingsLink';

suite('Templates > Common > Snippets: settingsLink()', () => {
  test('Renders as expected', () => {
    const result = settingsLink();

    expect(result).to.be.a('string');
    expect(result.includes('role="link" class="view__link view__message-description"')).to.equal(
      true
    );
    expect(result.includes(t('webViews.workspace.checkSettings'))).to.equal(true);
  });
});
