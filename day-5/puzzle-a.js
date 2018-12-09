const input = require('./input.js');
const fn = require('./func.js');
const polymer = fn.collapse(input.real);

console.log(`reactions completed, resulting polymer now contains ${polymer.length} units`);
