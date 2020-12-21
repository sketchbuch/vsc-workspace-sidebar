import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listItem = (file: File) => {
  return `
    <li class="list__item">
      <a class="list__element" href="#" title="${file.label} (${file.path})">
        <span class="list__title">${file.label}</span>
        <span class="list__description">${file.path}</span>
      </a>
    </li>
  `;
};
