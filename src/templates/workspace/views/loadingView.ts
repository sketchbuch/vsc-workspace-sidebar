import { WorkspaceState } from '../../../webviews';

export const loadingView = (state: WorkspaceState): string => {
  return `
    <section class="view loading">
    Loading
      <div class="vsc-loader"></div>
    </section>`;
};
