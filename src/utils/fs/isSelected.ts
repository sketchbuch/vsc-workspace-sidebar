import { isWindows } from '../os/isWindows'

export const isSelected = (file: string, selected: string) => {
  if (isWindows()) {
    return file.toLowerCase() === selected.toLowerCase()
  }

  return file === selected
}
