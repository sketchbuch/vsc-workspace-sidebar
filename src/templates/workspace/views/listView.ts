import { list } from '..';
import { WsFiles } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listView = (files: WsFiles | false): string => {
  if (files) {
    return `
    <section class="list view">
      ${list(files)}
    </section>`;
  }

  return '';
};
