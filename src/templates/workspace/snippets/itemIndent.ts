export type ItemIndentProps = {
  depth?: number
  isList?: boolean
}

export const itemIndent = ({ depth, isList }: ItemIndentProps): string => {
  if ((depth !== undefined && depth > 0) || isList) {
    let indentContent = '<div class="list_branch-indent list_branch-indent-list"></div>'

    if (depth) {
      indentContent = [...Array(depth).keys()]
        .map(() => {
          return `
        <div class="list_branch-indent"></div>
      `
        })
        .join('')
        .trim()
    }

    return `<div class="list_branch-indent-box">${indentContent}</div>`
  }

  return ''
}
