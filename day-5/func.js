var exports = module.exports = {};

exports.units = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g',
	'h', 'i', 'j', 'k', 'l', 'm', 'n',
	'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z',
];

exports.reactions = () => {
	return exports.units.reduce((r, e) => {
		r.push(e + e.toUpperCase());
		r.push(e.toUpperCase() + e);
		return r;
	}, []);
};

exports.collapse = (polymer) => {
	const pattern = /(\w)\1/i;
	const reactions = exports.reactions();
	let reactionsRemain = (polymer.match(pattern) === null ? false : true);
	let count = 0;
	while (reactionsRemain) {
		const polymerBefore = polymer;
		count++;

		console.log(`loop ${count}, polymer is ${polymer.length} units long `);

		// remove reactions
		reactions.forEach(reaction => {
			polymer = polymer.replace(reaction, '');
		});

		// compare the polymer to its previous iteration
		reactionsRemain = (polymer !== polymerBefore);
	}

	return polymer;
}
