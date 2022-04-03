import { workspace } from 'vscode';
import {
  ConfigActions,
  ConfigShowPaths,
  CONFIG_CLEAN_LABELS,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_FOLDER,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
} from '../constants/config';

export const getActionsConfig = (): string => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.actions') ?? ConfigActions.CURRENT_WINDOW
  );
};

export const getCleanLabelsConfig = (): boolean => {
  return workspace.getConfiguration().get('workspaceSidebar.cleanLabels') ?? CONFIG_CLEAN_LABELS;
};

export const getCondenseFileTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.condenseFileTree') ??
    CONFIG_CONDENSE_FILETREE
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

export const getRootFolderConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showRootFolder') || CONFIG_SHOW_ROOT_FOLDER
  );
};

export const getShowTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFolderHierarchy') ??
    CONFIG_SHOW_HIERARCHY
  );
};
