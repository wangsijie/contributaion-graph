const fs = require('fs');
const app = require('./src/app');
const input = fs.readFileSync('./log/test.log').toString().split('\n');
console.log(input.length);
const buffer = app(input);
require('fs').writeFileSync('outputs/graph.png', buffer);