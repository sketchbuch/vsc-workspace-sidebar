import { createSlice } from '@reduxjs/toolkit'
import { error } from './error'
import { fetch, fetchFulfilled, fetchPending, fetchRejected } from './fetch'
import { initialState } from './initialStates'
import { invalid } from './invalid'
import { list } from './list'
import { loading } from './loading'
import { setFileTree } from './setFileTree'
import { setRootFolders } from './setRootFolders'
import { setSearch } from './setSearch'
import { setVisibleFiles } from './setVisibleFiles'
import { toggleFolderState } from './toggleFolderState'
import { toggleFolderStateBulk } from './toggleFolderStateBulk'

export const workspaceSlice = createSlice({
  initialState: { ...initialState },
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, fetchFulfilled)
    builder.addCase(fetch.pending, fetchPending)
    builder.addCase(fetch.rejected, fetchRejected)
  },
  name: 'ws',
  reducers: {
    error,
    invalid,
    list,
    loading,
    setFileTree,
    setRootFolders,
    setSearch,
    setVisibleFiles,
    toggleFolderState,
    toggleFolderStateBulk,
  },
})
