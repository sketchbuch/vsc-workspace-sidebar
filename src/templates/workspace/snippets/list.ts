import { listItem } from '..';
import { sortFilesByLabel } from '../../../utils';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { convertWsFiles } from '../../../webviews/Workspace/helpers/convertWsFiles';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { files, selected, sort } = state;

  if (files !== false && files.length) {
    const listFiles = convertWsFiles(files, selected).sort(sortFilesByLabel);

    if (sort === 'descending') {
      listFiles.reverse();
    }

    return `<ul class="list__list">${listFiles
      .map((file) => listItem(file, renderVars))
      .join('')}</ul>`;
  }

  return '';
};
