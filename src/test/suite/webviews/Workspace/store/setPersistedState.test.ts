import { expect } from 'chai';
import { setPersistedState } from '../../../../../webviews/Workspace/store/setPersistedState';
import { mockVisibleFiles } from '../../../../mocks/mockFileData';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > setPersistedState()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      sort: 'descending',
      visibleFiles: mockVisibleFiles,
    });
    const expectedState = getMockState({
      sort: 'ascending',
      visibleFiles: mockVisibleFiles.reverse(),
    });

    expect(state).not.to.eql(expectedState);
    setPersistedState(state, { payload: { sort: 'ascending' }, type: 'ws/setPersistedState' });
    expect(state).to.eql(expectedState);
  });
});
