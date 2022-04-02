import { expect } from 'chai';
import { loading } from '../../../../../webviews/Workspace/store/loading';
import { getMockState } from '../../../../mocks/mockState';

suite('Webviews > Workspace > Store > loading()', () => {
  test('Updates state as expected', () => {
    const state = getMockState({
      error: 'FETCH',
      files: [],
      isFolderInvalid: true,
      selected: 'sdasd',
      state: 'error',
    });
    const expectedState = getMockState({
      error: '',
      files: [],
      isFolderInvalid: false,
      selected: '',
      state: 'loading',
    });

    expect(state).not.to.eql(expectedState);
    loading(state);
    expect(state).to.eql(expectedState);
  });
});
