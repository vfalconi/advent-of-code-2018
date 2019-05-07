const input = require('./input.js');
const fn = require('./func.js');

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
const workersCount = 5;
const workers = Array.from({ length: workersCount }, (_) => []);
const completedSteps = new Set();
const availableTasks = [];
const limit = Object.keys(steps).length;
const durations = exampleSeconds;

while (completedSteps.size < limit) {
	// first, we determine the order of things to be done
	const availableSteps = [];

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

	availableSteps.sort().forEach(step => completedSteps.add(step));

	availableTasks.push(availableSteps);
}

//const longestTaskInterval = tasks.map(task => durations[task]).reduce((longest, challenger) => (longest > challenger ? longest : challenger));

// now we do the things
availableTasks.forEach((tasks, i) => {
	console.log(tasks);
	tasks.forEach((task, i) => {
		console.log(task);
		for (n = 0; n < durations[task]; n++) {
			workers[i].push(task)
		}
	});
	console.table(workers);
});

console.table(workers);
