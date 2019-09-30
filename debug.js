const app = require('./src/app');
const buffer = app([10,100,200,300,400,500,600]);
require('fs').writeFileSync('output.png', buffer);