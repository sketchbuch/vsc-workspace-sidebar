import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listItem = (file: File) => {
  return `
    <li class="list__item">
      <span class="list__element" data-file="${file.file}" tabindex="0" title="${file.label} (${file.path})">
        <span class="list__title">${file.label}</span>
        <span class="list__description">${file.path}</span>
      </span>
    </li>
  `;
};
