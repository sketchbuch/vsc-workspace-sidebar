import { WorkspaceContext, WorkspaceEvents } from '../state.interface';

export const useCache = (context: WorkspaceContext, event: WorkspaceEvents): WorkspaceContext => {
  if (event.type === 'USE_CACHE') {
    return {
      error: '',
      files: event.cachedFiles,
      isFolderInvalid: false,
      state: 'list',
    };
  }

  return context;
};
