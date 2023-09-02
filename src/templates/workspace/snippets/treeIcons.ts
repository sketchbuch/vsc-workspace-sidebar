export const treeIconOpen = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-chevron-down"></div>
    `
}

export const treeIconClosed = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-chevron-right"></div>
    `
}

export const treeIconFile = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-record-small"></div>
    `
}

export const treeCustomIconFile = (icon: string): string => {
  return `
      <div class="list_branch-icon file-icon ${icon}-lang-file-icon"></div>
    `
}
