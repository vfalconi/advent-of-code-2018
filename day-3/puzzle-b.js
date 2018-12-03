const fn = require('./func.js');
const input = require('./input.js');
const tableSize = 1000;
const claims = fn.parseClaims(input.real);
const fabric = fn.claimFabric(fn.makeFabric(tableSize, tableSize), claims);
const singleSquares = new Set();

fabric.forEach(row => {
	row.forEach(col => {
		if (col.size === 1) col.forEach(claimID => singleSquares.add(claimID));
	})
});

fabric.forEach(row => {
	row.forEach(col => {
		if (col.size > 1) {
			singleSquares.forEach(id => {
				if (col.has(id)) singleSquares.delete(id);
			});
		}
	});
});

console.log(singleSquares);
