const input = require('./input.js');
const fn = require('./func.js');

const maxDistance = 10000; // 10000
const coordinates = input.real;
const limits = fn.findLimits(coordinates);
let safePlaces = 0;

for (let y = limits.y.min; y < limits.y.max; y++) {
	for (let x = limits.x.min; x < limits.x.max; x++) {
		const distance = coordinates.map(o => {
			return fn.distance([ [o.x, o.y], [x, y] ])
		}).reduce((sum, inc) => sum + inc);

		if (distance < maxDistance) safePlaces++;
	}
}

console.log(`There are ${safePlaces} safe places`);
