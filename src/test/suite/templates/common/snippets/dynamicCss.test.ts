import { expect } from 'chai';
import { dynamicCss } from '../../../../../templates/common/snippets/dynamicCss';

suite('Templates > Common > Snippets: dynamicCss()', () => {
  test('Renders as expected', () => {
    const result = dynamicCss(3);

    expect(result).to.be.a('string');
    expect(result.includes('.list__branch-list-item[data-depth="1"] > .list__element')).to.equal(
      true
    );
    expect(result.includes('.list__branch-list-item[data-depth="2"] > .list__element')).to.equal(
      true
    );
    expect(result.includes('.list__branch-list-item[data-depth="3"] > .list__element')).to.equal(
      true
    );
  });
});
