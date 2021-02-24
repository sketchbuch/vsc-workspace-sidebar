import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { workspaceSlice } from '../webviews/Workspace/store/workspaceSlice';

const reducers = combineReducers({
  [workspaceSlice.name]: workspaceSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof reducers>;
