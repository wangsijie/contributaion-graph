const fs = require('fs');
const app = require('./src/app');
const input = JSON.parse(fs.readFileSync('./log/1569824495015.json').toString());
console.log(input.length);
const buffer = app(input);
require('fs').writeFileSync('outputs/graph.png', buffer);