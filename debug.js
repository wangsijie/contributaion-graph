const fs = require('fs');
const app = require('./src/app');
const input = JSON.parse(fs.readFileSync('./log/1569827656255.json').toString());
console.log(input.length);
const buffer = app(input);
require('fs').writeFileSync('outputs/graph.png', buffer);