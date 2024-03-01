const madge = require('madge');

madge('./src/extension.ts').then((res) => {
  console.log(res.circular());
})