export const treeIndent = (depth: number): string => {
  if (depth === 0) {
    return ''
  }

  const indents = [...Array(depth).keys()]
    .map(() => {
      return `
        <div class="list_branch-indent"></div>
      `
    })
    .join('')
    .trim()

  return `<div class="list_branch-indent-box">${indents}</div>`
}

export const listIndent = (): string => {
  return `<div class="list_branch-indent-box"><div class="list_branch-indent list_branch-indent-list"></div></div>`
}
