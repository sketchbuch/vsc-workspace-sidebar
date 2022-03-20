import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspacePmPayloadToggleFolderState, WorkspaceState } from '../..';

export const toggleFolderState = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadToggleFolderState>
): void => {
  const isClosed = state.closedFolders.includes(action.payload);

  if (action.payload) {
    if (isClosed) {
      state.closedFolders = state.closedFolders.filter((folder) => folder !== action.payload);
    } else if (!isClosed) {
      state.closedFolders.push(action.payload);
    }
  }
};
