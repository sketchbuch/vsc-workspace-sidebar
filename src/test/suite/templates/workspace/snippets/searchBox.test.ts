import { expect } from 'chai';
import { searchBox } from '../../../../../templates/workspace';
import { getMockState } from '../../../../mocks';

suite('Templates > Workspace > Snippets: searchBox()', () => {
  test('Renders nothing if !showSearch', () => {
    const mockState = getMockState({ search: 'VSCode' });
    const result = searchBox(mockState);

    expect(result).to.be.a('string');
    expect(result.includes('class="searchBox"')).to.equal(true);
    expect(result.includes('class="searchBox__input"')).to.equal(true);
    expect(result.includes(`value="${mockState.search}"`)).to.equal(true);
  });
});
