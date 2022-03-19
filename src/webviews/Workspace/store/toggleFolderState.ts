import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspacePmPayloadToggleFolderState, WorkspaceState } from '../..';

export const toggleFolderState = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadToggleFolderState>
): void => {
  if (state.closedFolders.includes(action.payload)) {
    state.closedFolders = state.closedFolders.filter((folder) => folder !== action.payload);
  } else {
    state.closedFolders.push(action.payload);
  }
};
