import { workspace } from 'vscode';
import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { CONFIG_SHOW_HIERARCHY } from '../../../constants/config';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTreeNew } from '../../../webviews/Workspace/helpers/getFileTree';
import { treeNew } from './tree';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { files, search, visibleFiles } = state;

  if (files === false) {
    return '';
  }

  if (visibleFiles.length < 1) {
    if (search) {
      return `
          <div class="list__list-searchedout">
            <p>${t('webViews.workspace.searchedOut')}</p>
          </div>
        `;
    } else {
      return '';
    }
  }

  const showTree: boolean =
    workspace.getConfiguration().get('workspaceSidebar.showFolderHierarchy') ??
    CONFIG_SHOW_HIERARCHY;

  return `
      <ul class="list__list list__styled-list${showTree ? ' list__styled-list--tree' : ''}">
        ${
          showTree
            ? treeNew(getFileTreeNew(visibleFiles), renderVars, state, 0)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
