import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listItem = (file: File) => {
  const { file: dataFile, label, path, selected } = file;

  return `
    <li class="list__item">
      <span class="list__element${
        selected ? ' list__element--selected' : ''
      }" data-file="${dataFile}" tabindex="0" title="${label} (${path})">
        <span class="list__title">${label}</span>
        <span class="list__description">${path}</span>
      </span>
    </li>
  `;
};
