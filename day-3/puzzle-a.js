const fn = require('./func.js');
const input = require('./input.js');
const tableSize = 1000;
const claims = fn.parseClaims(input.real);
const fabric = fn.claimFabric(fn.makeFabric(tableSize, tableSize), claims);
let overlap = 0;

fabric.forEach(row => {
	row.forEach(col => {
		if (col.size > 1) overlap++;
	})
});

console.log(overlap);
