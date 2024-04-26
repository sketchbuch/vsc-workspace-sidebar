import { capitalise } from '../../webviews/Workspace/helpers/capitalise'

export const cleanLabel = (label: string) => {
  return label
    .toLowerCase()
    .replace(/[-|_]/g, ' ')
    .replace(/  +/g, ' ') // Multiple spaces to single
    .split(' ')
    .map((word) => capitalise(word))
    .join(' ')
}
