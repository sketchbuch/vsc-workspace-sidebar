export const searchOption = (
  name: string,
  pressed: boolean,
  label: string,
  codicon: string
): string => {
  return `
    <vscode-button
      appearance="icon"
      aria-label="${label}"
      aria-pressed="${pressed}"
      class="searchBox__options-button searchBox__options-button--toggle"
      name="${name}"
      title="${label}"
    >
      <span class="codicon codicon-${codicon}" data-btnname="${name}"></span>
    </vscode-button>
  `
}
