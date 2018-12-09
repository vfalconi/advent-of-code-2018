const input = require('./input.js');
const fn = require('./func.js');

const units = fn.units;

const results = units.map(unit => {
	const pattern = new RegExp(unit, 'gi');
	let polymer = input.real;
	polymer = polymer.replace(pattern, '');
	return { unit: unit, polymer: fn.collapse(polymer) };
}).reduce((a, b) => a.polymer.length < b.polymer.length ? a : b);

console.log(`the best polymer was found by remove ${results.unit}/${results.unit.toUpperCase()}, resulting in a polymer that is ${results.polymer.length} units long`);
