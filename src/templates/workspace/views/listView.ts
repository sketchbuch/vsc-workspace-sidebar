import { list } from '..';
import { WsFiles } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listView = (files: WsFiles | false, selected: string): string => {
  if (files) {
    return `
    <section class="view list">
      ${list(files, selected)}
    </section>`;
  }

  return '';
};
