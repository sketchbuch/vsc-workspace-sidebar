/**
 * To run: "node ./scripts/find_circular.js" from the root folder
 */
const madge = require('madge');

madge('./src/extension.ts').then((res) => {
  console.log(res.circular());
})