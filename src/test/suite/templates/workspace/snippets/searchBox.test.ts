import { expect } from 'chai';
import { searchBox } from '../../../../../templates/workspace';
import { getMockState } from '../../../../mocks';

suite('Templates > Workspace > Snippets: searchBox()', () => {
  test('Renders nothing if !showSearch', () => {
    const mockState = getMockState({ search: 'VSCode' });
    const result = searchBox(mockState);

    expect(result).to.be.a('string');
    expect(result).contains('class="searchBox"');
    expect(result).contains('class="searchBox__input"');
    expect(result).contains(`value="${mockState.search}"`);
  });
});
