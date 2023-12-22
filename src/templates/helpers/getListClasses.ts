export const getListClasses = (isFileTree: boolean): string => {
  return 'list__list list__styled-list' + (isFileTree ? ' list__styled-list--tree' : '')
}
