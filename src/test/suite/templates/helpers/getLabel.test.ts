import { expect } from 'chai';
import { getLabel } from '../../../../templates/helpers/getLabel';

suite('Templates > Helpers > getLabel():', () => {
  test('Returns label if no search term', () => {
    expect(getLabel('test', '')).to.equal('test');
  });

  test('Returns label if no search term found', () => {
    expect(getLabel('test', 'x')).to.equal('test');
  });

  test('Returns label with search terms wrapped correctly', () => {
    expect(getLabel('test', 't')).to.equal('<mark>t</mark>es<mark>t</mark>');
  });
});
