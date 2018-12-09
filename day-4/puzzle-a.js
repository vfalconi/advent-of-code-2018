const input = require('./input.js');
const fn = require('./func.js');

const guardStats = fn.guardStats(input.sample.sort().map(entry => entry.replace('1518-', '')));

// show table
fn.showTable(guardStats.records);

const mostAsleep = Object.keys(guardStats.guardsTimeAsleep).reduce((a, b) => guardStats.guardsTimeAsleep[a] > guardStats.guardsTimeAsleep[b] ? a : b);
const mostLikelySleepTime = guardStats.guardsSleepLikeliness[mostAsleep].reduce((max, x, i, arr) => x > arr[max] ? i : max, 0);
const answer = parseInt(mostAsleep.replace('#', ''), 10) * mostLikelySleepTime;

console.log(`Guard who slept the most: ${mostAsleep}`);
console.log(`Minute Guard ${mostAsleep} was most likely asleep was ${mostLikelySleepTime}`);
console.log(`Your answer is ${answer}`);
