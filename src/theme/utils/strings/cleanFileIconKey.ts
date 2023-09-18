/**
 * Replaces characters in file icon keys that result in invalid CSS selectors.
 */
export const cleanFileIconKey = (fileIconKey: string): string => {
  return fileIconKey
    .replace(/\./g, '-')
    .replace(/\//g, '-')
    .replace(/\++/g, 'pp')
    .replace(/#/g, 'h')
}
