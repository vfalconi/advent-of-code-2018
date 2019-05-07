const input = require('./input.js');
const fn = require('./func.js');

const completedSteps = new Set();
const steps = fn.parseInstructions(input.real);

while (Object.keys(steps).length) {
	const available = [];
	Object.keys(steps).forEach(step => {
		if (steps[step].length === 0 || steps[step].every(prereq => completedSteps.has(prereq))) available.push(step);
	});

	available.sort();

	completedSteps.add(available[0]);
	delete steps[available[0]];
}

console.log(Array.from(completedSteps).join(''));
