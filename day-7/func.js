var exports = module.exports = {};

exports.parseInstructions = (instructions) => {
	const allSteps = [];
	const steps = {};
	const inst = instructions.map(step => {
		const parsed = step
			.replace('Step ', '')
			.replace(' must be finished before step ', ' ')
			.replace(' can begin.', '')
			.split(' ');

		return [ parsed[1], parsed[0] ];
	});

	// create list of steps
	inst.forEach(instruction => {
		if (!allSteps.includes(instruction[0])) allSteps.push(instruction[0]);
		if (!allSteps.includes(instruction[1])) allSteps.push(instruction[1]);

		if (steps[instruction[0]] === undefined) {
			steps[instruction[0]] = [];
		}

		steps[instruction[0]].push(instruction[1]);
	})

	// make sure initially-available steps are included
	allSteps.forEach(step => {
		if (!Object.keys(steps).includes(step)) {
			steps[step] = []
		}
	});

	return steps;
}
