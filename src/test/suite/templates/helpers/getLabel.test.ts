import { expect } from 'chai';
import { getLabel } from '../../../../templates/helpers/getLabel';
import { getMockSearchState } from '../../../mocks/mockState';

suite('Templates > Helpers > getLabel():', () => {
  test('Returns label if no search term', () => {
    expect(getLabel('Test', getMockSearchState())).to.equal('Test');
  });

  test('Returns label if no search term found', () => {
    expect(getLabel('Test', getMockSearchState({ term: 'x' }))).to.equal('Test');
  });

  test('Returns label with search terms wrapped correctly (case sensitive)', () => {
    expect(getLabel('Test', getMockSearchState({ term: 'T' }))).to.equal('<mark>T</mark>est');
  });

  test('Returns label with search terms wrapped correctly (case insensitive)', () => {
    expect(getLabel('Test', getMockSearchState({ term: 'T', caseInsensitive: true }))).to.equal(
      '<mark>T</mark>es<mark>t</mark>'
    );
  });
});
