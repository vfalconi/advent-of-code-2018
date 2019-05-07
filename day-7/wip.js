const input = require('./input.js');
const fn = require('./func.js');

const workersCount = 5;
const workers = Array.from({ length: workersCount }, (_) => []);
const completedSteps = new Set();
const steps = fn.parseInstructions(input.sample);
const exampleSeconds = {
	'A': 1,	'B': 2,	'C': 3,	'D': 4,	'E': 5,	'F': 6,	'G': 7,
	'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14,
	'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21,
	'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
};
const seconds = {
	'A': 61, 'B': 62, 'C': 63, 'D': 64, 'E': 65, 'F': 66, 'G': 67,
	'H': 68, 'I': 69, 'J': 70, 'K': 71, 'L': 72, 'M': 73, 'N': 74,
	'O': 75, 'P': 76, 'Q': 77, 'R': 78, 'S': 79, 'T': 80, 'U': 81,
	'V': 82, 'W': 83, 'X': 84, 'Y': 85, 'Z': 86,
};
let intervalCounter = 0;
let intervalPointer = 0;
let tempCounter = 0;
const limit = Object.keys(steps).length;

// add available steps
//Object.keys(steps).forEach(step => (steps[step].length === 0 ? completedSteps.add(step) : null));

while (completedSteps.size < limit) {
	const availableSteps = [];
	const durations = exampleSeconds;

	console.group(`Iteration ${tempCounter+1}`);

	Object.keys(steps).forEach(s => {
		// figure out what steps are available
		const step = steps[s];

		// add steps with no prereqs
		// and make sure we don't work steps that have been completed
		// and make sure we don't add duplicates to availableSteps
		if (step.length === 0 && !completedSteps.has(s) && !availableSteps.includes(s)) availableSteps.push(s);

		// add steps that have had their prereqs completed, but have not been completed themselves
		// and make sure we don't add duplicates to availableSteps
		if (step.every(prereq => completedSteps.has(prereq)) && !completedSteps.has(s) && !availableSteps.includes(s)) availableSteps.push(s);
	});

	availableSteps.sort();

	console.log('available steps: ', availableSteps);

	const longestInterval = availableSteps.map(step => durations[step]).reduce((longest, challenger) => (longest > challenger ? longest : challenger));

	console.log('longest interval: ', longestInterval);

	availableSteps.forEach((step, si) => {
		for (n=intervalPointer; n<durations[step]; n++) {
			workers[si].push(availableSteps[si]);
		}
		completedSteps.add(availableSteps[si]);
	});

	workers.forEach((worker, wi) => {
		for (n=0; n < longestInterval; n++) {
			if (worker[] === undefined) worker[n] = '.';
		}
	});

	/*workers.forEach((worker, i) => {
		if (availableSteps[i] !== undefined) {
			for (n=intervalPointer; n<durations[availableSteps[i]]; n++) {
				workers[i].push(availableSteps[i]);
			}
			completedSteps.add(availableSteps[i]);
		}

		if (availableSteps[i] === undefined) {

		}
	});*/

	//const countUnusedWorkers = (workers.length > availableSteps.length ? workers.length - availableSteps.length : 0);

	/*availableSteps.forEach((step, i) => {
		for (n=0; n < durations[step]; n++) {
			workers[i].push(step);
		}
		intervalCounter += (durations[step] - 1);
		completedSteps.add(step);
	});*/

	//console.log('interval counter: ', intervalCounter);
	console.log('workers after iteration:');
	console.table(workers);
	console.log('completed steps: ', completedSteps);
	console.groupEnd();
	console.log('');
	console.log('');

	// temp code to end the while loop
	tempCounter++;
	//completedSteps.add(tempCounter);
}

// this reveals the answer
//console.log(Array.from(completedSteps).join(''));
