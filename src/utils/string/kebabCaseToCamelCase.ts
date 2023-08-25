// https://stackoverflow.com/questions/57556471/convert-kebab-case-to-camelcase-with-javascript
export const kebabCaseToCamelCase = (str: string) => str.replace(/-./g, (x) => x[1].toUpperCase())
