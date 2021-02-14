import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspacePmPayloadSearchTerm, WorkspaceState } from '../..';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const setSearchTerm = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearchTerm>
): void => {
  state.search = action.payload;

  if (state.files === false) {
    state.visibleFiles = [];
  } else {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
  }
};
