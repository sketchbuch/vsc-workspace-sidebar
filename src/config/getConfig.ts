import { workspace } from 'vscode';
import {
  ConfigActions,
  ConfigShowPaths,
  CONFIG_DEPTH,
  CONFIG_FOLDER,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
} from '../constants/config';

export const getActionsConfig = (): string => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.actions') ?? ConfigActions.CURRENT_WINDOW
  );
};

export const getDepthConfig = (): number => {
  return workspace.getConfiguration().get('workspaceSidebar.depth') ?? CONFIG_DEPTH;
};

export const getFolderConfig = (): string => {
  return workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER;
};

export const getSearchMinConfig = (): number => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.searchMinimum') ?? CONFIG_SEARCH_MINIMUM
  );
};

export const getShowPathsConfig = (): ConfigShowPaths => {
  return workspace.getConfiguration().get('workspaceSidebar.showPaths') || ConfigShowPaths.NEVER;
};

export const getShowTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFolderHierarchy') ??
    CONFIG_SHOW_HIERARCHY
  );
};
