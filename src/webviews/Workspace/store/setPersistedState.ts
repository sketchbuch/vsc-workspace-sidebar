import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspacePersistedState, WorkspaceState } from '../..';

export const setPersistedState = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePersistedState>
): void => {
  state.sort = action.payload.sort;
  state.visibleFiles.reverse();
};
