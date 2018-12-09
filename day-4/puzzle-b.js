const input = require('./input.js');
const fn = require('./func.js');

const guardStats = fn.guardStats(input.real.sort().map(entry => entry.replace('1518-', '')));

// show table
fn.showTable(guardStats.records);

const guard = Object.keys(guardStats.guardsSleepLikeliness).map(guard => {
	const minute = guardStats.guardsSleepLikeliness[guard].reduce((max, x, i, arr) => x > arr[max] ? i : max, 0);
	return { guard: guard, minute: minute, count: guardStats.guardsSleepLikeliness[guard][minute] };
}).reduce((a, b) => a.count > b.count ? a : b);

console.log(`Guard ${guard.guard} was asleep the most frequently on minute ${guard.minute} (${guard.count} times)`);

const answer = parseInt(guard.guard.replace('#', ''), 10) * guard.minute;

console.log(`Your answer is ${answer}`);
