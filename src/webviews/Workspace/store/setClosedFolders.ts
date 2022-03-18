import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspacePmPayloadOpenFolders, WorkspaceState } from '../..';

export const setClosedFolders = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadOpenFolders>
): void => {
  if (state.closedFolders.includes(action.payload)) {
    state.closedFolders = state.closedFolders.filter((folder) => folder !== action.payload);
  } else {
    state.closedFolders.push(action.payload);
  }
};
