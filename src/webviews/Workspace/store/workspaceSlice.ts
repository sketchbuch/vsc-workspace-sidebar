import { createSlice } from '@reduxjs/toolkit';
import { WorkspaceState } from '../..';
import { error } from './error';
import { invalid } from './invalid';
import { list } from './list';
import { loading } from './loading';

export const workspaceSlice = createSlice({
  name: 'ws',
  initialState: {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: '',
    state: 'loading',
  } as WorkspaceState,
  reducers: {
    error,
    invalid,
    list,
    loading,
  },
});
