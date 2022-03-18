import { sortFilesByProp } from '../../../utils/arrays/sortFilesByLabel';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTooltip } from '../../../webviews/Workspace/helpers/getFileTooltip';
import { FileTree, FileTreeNew } from '../../../webviews/Workspace/helpers/getFileTree';
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';
import { treeIconClosed, treeIconFile, treeIconOpen } from './treeIcons';
import { treeIndent } from './treeIndent';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

export const tree = (branch: FileTree, renderVars: RenderVars, depth: number): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      const hasSubtree = Object.entries(value).length > 0;
      const valueIsFile = isFile(value);

      if (!valueIsFile && hasSubtree) {
        return `
          <li class="list__branch-list-item list__branch-list-item-folder list__styled-item" data-folder="${key}" data-depth="${depth}">
            ${treeIndent(depth)}
            <span class="list__element" title="${key}">
              ${treeIconOpen()}
              <span class="list__text">
                <span class="list__title">${key}</span>
              </span>
            </span>
          </li>
          ${tree(value, renderVars, depth + 1)}
        `;
      }

      const { file, isSelected, label, path, showPath } = value;
      const classes = `list__styled-item ${
        isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
      }`;
      const tooltip = valueIsFile ? getFileTooltip(value, 'cur-win') : key;
      const itemLabel = valueIsFile ? label : key;

      return `
        <li class="list__branch-list-item list__branch-list-item-file ${classes}" data-file="${file}" data-depth="${depth}">
          ${isSelected ? listItemIcon(renderVars) : ''}
          ${treeIndent(depth)}
          <span class="list__element" title="${tooltip}">
            ${treeIconFile()}
            <span class="list__text">
              <span class="list__title">${itemLabel}</span>
              ${showPath ? `<span class="list__description">${path}</span>` : ''}
            </span>
            ${valueIsFile && !isSelected ? listItemButtons(value, renderVars) : ''}
          </span>
        </li>
      `;
    })
    .join('');
};

export const treeNew = (
  branch: FileTreeNew,
  renderVars: RenderVars,
  state: WorkspaceState,
  depth: number
): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      const { files, folderPath, sub } = value;
      const hasSubtree = Object.keys(sub).length > 0;
      const hasFiles = files.length > 0;
      const isClosed = state.closedFolders.includes(folderPath);

      if (hasSubtree || hasFiles) {
        return `
            <li class="list__branch-list-item list__branch-list-item-folder list__styled-item" data-folder="${folderPath}" data-depth="${depth}">
              ${treeIndent(depth)}
              <span class="list__element" title="${key}">
                ${isClosed ? treeIconClosed() : treeIconOpen()}
                <span class="list__text">
                  <span class="list__title">${key}</span>
                </span>
              </span>
            </li>
            ${hasSubtree && !isClosed ? treeNew(sub, renderVars, state, depth + 1) : ''}
            ${
              hasFiles && !isClosed
                ? files
                    .sort(sortFilesByProp('label'))
                    .map((f) => {
                      const { file, isSelected, label, path, showPath } = f;
                      const classes = `list__styled-item ${
                        isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
                      }`;
                      const tooltip = getFileTooltip(f, 'cur-win');

                      return `
                        <li class="list__branch-list-item list__branch-list-item-file ${classes}" data-file="${file}" data-depth="${depth}">
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
