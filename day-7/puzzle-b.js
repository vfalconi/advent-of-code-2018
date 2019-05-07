const input = require('./input.js');
const fn = require('./func.js');

const workersCount = 2;
const workers = Array.from({ length: workersCount }, _=> );
const completedSteps = new Set();
const steps = fn.parseInstructions(input.sample);
const seconds = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G',
	'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U',
	'V', 'W', 'X', 'Y', 'Z',
];
let counter = 0;

console.log(workers);

while (Object.keys(steps).length) {
	console.log(counter);
	counter++;
}

console.log(Array.from(completedSteps).join(''));
