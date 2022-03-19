import path from 'path';
import { sortFilesByProp } from '../../../utils/arrays/sortFilesByLabel';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTooltip } from '../../../webviews/Workspace/helpers/getFileTooltip';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';
import { treeIconClosed, treeIconFile, treeIconOpen } from './treeIcons';
import { treeIndent } from './treeIndent';

export const tree = (
  branch: FileTree,
  renderVars: RenderVars,
  state: WorkspaceState,
  depth: number
): string => {
  if (depth === 0) {
    console.log('### branch', branch);
  }
  return Object.entries(branch)
    .map(([key, value]) => {
      const { files, folderPath, sub } = value;
      const hasSubtree = Object.keys(sub).length > 0;
      const hasFiles = files.length > 0;
      const isClosed = state.closedFolders.includes(folderPath);
      const indicateSelected = isClosed && state.selected.includes(`${folderPath}${path.sep}`);

      if (hasSubtree || hasFiles) {
        const folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item ${
          indicateSelected ? 'list__styled-item--selected' : ''
        }`;

        return `
            <li class="${folderClasses}" data-folder="${folderPath}" data-depth="${depth}">
              ${indicateSelected ? listItemIcon(renderVars) : ''}
              ${treeIndent(depth)}
              <span class="list__element" title="${key}">
                ${isClosed ? treeIconClosed() : treeIconOpen()}
                <span class="list__text">
                  <span class="list__title">${key}</span>
                </span>
              </span>
            </li>
            ${hasSubtree && !isClosed ? tree(sub, renderVars, state, depth + 1) : ''}
            ${
              hasFiles && !isClosed
                ? files
                    .sort(sortFilesByProp('label'))
                    .map((f) => {
                      const { file, isSelected, label, path, showPath } = f;
                      const classes = `list__branch-list-item list__branch-list-item-file list__styled-item ${
                        isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
                      }`;
                      const tooltip = getFileTooltip(f, 'cur-win');

                      return `
                        <li class="${classes}" data-file="${file}" data-depth="${depth}">
                          ${isSelected ? listItemIcon(renderVars) : ''}
                          ${treeIndent(depth + 1)}
                          <span class="list__element" title="${tooltip}">
                            ${treeIconFile()}
                            <span class="list__text">
                              <span class="list__title">${label}</span>
                              ${showPath ? `<span class="list__description">${path}</span>` : ''}
                            </span>
                            ${!isSelected ? listItemButtons(f, renderVars) : ''}
                          </span>
                        </li>
                      `;
                    })
                    .join('')
                : ''
            }
          `;
      }

      return ``;
    })
    .join('');
};
