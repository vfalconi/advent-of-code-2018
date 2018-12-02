const input = require('./input.js');
const ids = input.real.map(id => id.split(''));
let matchIDs = new Set();
let matchIndex = 0;

ids.forEach((id, index) => {
	ids.forEach(id2 => {
		let tmpIndex = 0;
		let diff = 0;

		if (ids[index] !== id2) {
			ids[index].forEach((char, charIndex) => {
				if (char !== id2[charIndex]) {
					diff++;
					tmpIndex = charIndex;
				}
			});
			if (diff === 1) {
				matchIndex = tmpIndex;
				matchIDs.add(id.join('')).add(id2.join(''));
			}
		}
	});
});

const id = Array.from(matchIDs).map(id => {
	return id.slice(0, matchIndex) + id.slice(matchIndex+1);
}).reduce(id => id);

console.log(id);
