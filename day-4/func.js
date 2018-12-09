var exports = module.exports = {};

exports.guardStats = (schedule) => {

	const createTimetable = (defaultValue) => {
		const table = [];
		for (let i = 0; i < 60; i++) {
			if (defaultValue !== undefined) table[i] = defaultValue;
			if (defaultValue === undefined) table[i] = '.';
		}
		return table;
	}

	const getID = (entry) => entry.replace(/\[\d\d\-\d\d\s\d\d\:\d\d\]\s/g, '').replace('Guard ', '').replace(' begins shift', '');

	const getDate = (entry) => entry.substr(1, 5);

	const getMinutes = (entry) => parseInt(entry.substr(10, 2), 10);

	const records = {};
	const guardsTimeAsleep = {};
	const guardsSleepLikeliness = {};
	let currentGuard = null;

	schedule.forEach((entry, index) => {
		const pieces = entry.split('] ');
		const date = getDate(entry);
		if (pieces[1].indexOf('Guard #') > -1) currentGuard = getID(entry);

		if (records[date] === undefined) records[date] = {};
		if (guardsTimeAsleep[currentGuard] === undefined) guardsTimeAsleep[currentGuard] = 0;
		if (guardsSleepLikeliness[currentGuard] === undefined) guardsSleepLikeliness[currentGuard] = createTimetable(0);

		if (pieces[1] === 'falls asleep') {
			const startSleep = getMinutes(schedule[index]);
			const endSleep = getMinutes(schedule[index+1]);
			if (records[date][currentGuard] === undefined) records[date][currentGuard] = createTimetable();

			guardsTimeAsleep[currentGuard] += (endSleep - startSleep);

			for (let x = startSleep; x < endSleep; x++) {
				records[date][currentGuard][x] = '#';
				guardsSleepLikeliness[currentGuard][x]++;
			}
		}
	});

	return {
		records: records,
		guardsTimeAsleep: guardsTimeAsleep,
		guardsSleepLikeliness: guardsSleepLikeliness
	}

};

exports.showTable = (records) => {
	Object.keys(records).forEach((date, index) => {
		Object.keys(records[date]).forEach(guard => console.log(date, guard, records[date][guard].join('')));
	});
}
