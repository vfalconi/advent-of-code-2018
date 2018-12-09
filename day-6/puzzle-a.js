const input = require('./input.js');
const fn = require('./func.js');

const coordinates = input.real.map(p => {
	return { x: p.x, y: p.y, points: [] }
});
const limits = fn.findLimits(coordinates);

for (let y = limits.y.min; y < limits.y.max; y++) {
	console.log(`computing for y=${y}`);
	for (let x = limits.x.min; x < limits.x.max; x++) {
		console.log(`computing for x=${x}`);
		const distances = coordinates.map(o => {
			return {
				x: o.x,
				y: o.y,
				d: fn.distance([ [o.x, o.y], [x, y] ])
			};
		}).sort((a, b) => a.d - b.d);

		if (distances[0].d < distances[1].d) {
			coordinates.find(coord => coord.x === distances[0].x && coord.y === distances[0].y).points.push({ x, y });
		}
	}
}

const innerAreas = coordinates.filter(({ points }) => points.every(({ x, y }) => x > limits.x.min && x < limits.x.max && y > limits.y.min && y < limits.y.max));
const maxArea = Math.max(...innerAreas.map(({ points }) => points.length))

console.log(`The size of the largest finite area is ${maxArea}`);
