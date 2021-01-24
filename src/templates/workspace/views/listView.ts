import { list } from '..';
import { WsFiles } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listView = (files: WsFiles | false): string => {
  if (files) {
    return `
    <section class="view list">
      ${list(files)}
    </section>`;
  }

  return '';
};
