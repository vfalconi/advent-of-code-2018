const input = require('./input.js');
const ids = input.real.map(id => id.split(''));

const checksums = ids.map((id, index) => {
	const matches = { two: 0, three: 0 };
	const uniqueChars = new Set(id);

	uniqueChars.forEach(char => {
		const pattern = new RegExp(char, 'g');
		if (id.join('').match(pattern).length === 2) matches.two++;
		if (id.join('').match(pattern).length === 3) matches.three++;

	});

	return matches;
}).filter(values => values.two > 0 || values.three > 0);

let twos = 0;
let threes = 0;

checksums.forEach(checksum => {
	if (checksum.two > 0) twos++;
	if (checksum.three > 0) threes++;
});

console.log(twos * threes);
